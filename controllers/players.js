import { addPlayerDB, getPlayersDB, updatePlayerDB } from "../DAL/playersDAL.js";

const dbPath = "./DAL/dbPlayers.txt";

const getPlayers = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    res.status(200).send(response);
}

const addPlayer = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;
    const exists = response.some(player => player.username === data.username);
    if (exists) {
        return res.status(201).send({ message: "The player already exists." });
    }

    try {
        await addPlayerDB(data);
    } catch (error) {
        return res.status(500).send({ err: "Failed write data." });
    }
    res.status(200).send({ message: "The player was successfully added!" });
}

const updatePlayer = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;
    const id = req.params.id;
    let numId;
    if (Number(id)) {
        numId = Number(id);
    } else {
        return res.status(500).send({ err: "id is invalid." });
    }
    let exists = false;
    for (let i of response) {
        if (i.id === numId) {
            exists = true;
            i.best_time = data.best_time;
            try {
                await updatePlayerDB(numId, data);
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