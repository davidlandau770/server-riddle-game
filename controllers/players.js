import { readData, writeData } from "../DAL/fs.read-write.js";

const dbPath = "./DAL/dbPlayers.txt";

const getPlayers = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    res.status(200).send(response);
}

const addPlayer = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;
    const maxId = Math.max(...response.map(player => player.id)) || 0;
    const newData = { id: Number(maxId) + 1, ...data };

    const exists = response.some(player => player.name === newData.name);
    if (exists) {
        return res.status(201).send({ message: "The name already exists." });
    }

    response.push(newData);

    try {
        await writeData(dbPath, response);
    } catch (error) {
        return res.status(500).send({ err: "Failed write data." });
    }
    res.status(200).send({ message: "The name was successfully added!" });
}

const updatePlayer = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const newData = req.body;

    let exists = false;
    for (let i of response) {
        if (i.name === newData.name) {
            exists = true;
            i.lowestTime = newData.lowestTime;
            try {
                await writeData(dbPath, response);
            } catch (error) {
                return res.status(500).end({ err: "Failed write data." });
            }
            res.status(201).send({ message: "The player was successfully updated!" });
        }
    }
    if (!exists) {
        res.status(501).send({ err: "The player does not exist." });
    }
}

export {
    getPlayers,
    addPlayer,
    updatePlayer
}