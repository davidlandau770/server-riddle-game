import { readData, writeData } from "../DAL/fs.read-write.js"

const dbPath = "./DAL/dbRiddles.txt";

const getRiddles = async (req, res) => {    
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    res.status(200).send(response);
}

const addRiddle = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;

    const maxId = Math.max(...response.map(riddle => riddle.id)) || 0;
    const newData = { id: Number(maxId) + 1, ...data};
    
    const exists = response.some(riddle => riddle.taskDescription === newData.taskDescription && riddle.correctAnswer === newData.correctAnswer);
    if (exists) {
        return res.status(201).send({ message: "The question already exists." });
    }

    response.push(newData);
    
    try {
        await writeData(dbPath, response);
    } catch (error) {
        return res.status(500).send({ err: "Failed write data." });
    }
    res.status(200).send({ message: "The riddle was successfully added!" });
}

const updateRiddle = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const newData = req.body;
    
    let exists = false;
    for (let i of response) {
        if (i.id === newData.id) {
            exists = true;
            i.taskDescription = newData.taskDescription;
            i.correctAnswer = newData.correctAnswer;
            try {
                await writeData(dbPath, response);
            } catch (error) {
                return res.status(500).end({ err: "Failed write data." });
            }
            res.status(201).send({ message: "The riddle was successfully updated!" });
        }
    }
    if (!exists) {
        res.status(501).send({ err: "The riddle does not exist." });
    }
}

const deleteRiddle = async (req, res) => {
    let response;
    try {
        response = await readData(dbPath);
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const newData = req.body;
    
    let exists = false;
    for (let i in response) {
        if (response[i].id === newData.id) {
            exists = true;
            response.splice(i, 1)
            try {
                await writeData(dbPath, response);
            } catch (error) {
                return res.status(500).end({ err: "Failed write data." });
            }
            res.status(200).send({ message: "The riddle was successfully updated!" });
        }
    }
    if (!exists) {
        res.status(501).send({ err: "The riddle does not exist." });
    }
}

export {
    getRiddles,
    addRiddle,
    updateRiddle,
    deleteRiddle
}