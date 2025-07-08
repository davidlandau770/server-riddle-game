import { readData, writeData } from "../DAL/crud.js";

const path = "./DAL/dbRiddles.txt"

async function getRiddles(req, res) {
    let response;
    try {
        response = await readData(path);
    } catch (err) {
        return res.status(500).send({ err: "Faild read data." });
    }
    res.status(200).send(response);
}

async function addRiddle(req, res) {
    let response;
    try {
        response = await readData(path);
    } catch (err) {
        return res.status(500).send({ err: "Faild read data." });
    }

    const newData = req.body;
    const exists = response.some(riddle => riddle.taskDescription === newData.taskDescription);

    if (exists) {
        return res.status(201).send({ message: "The question is exists." })
    }

    response.push(newData)
    try {
        await writeData(path, JSON.stringify(response));
    } catch (error) {
        return res.status(500).send({ err: "Faild write data." });
    }
    res.status(200).send({ message: "The riddle was successfully added!" });
}

async function updateRiddle(req, res) {
    let response;
    try {
        response = await readData(path);
    } catch (err) {
        return res.status(500).send({ err: "Faild read data." });
    }
    const newData = req.body;
    
    let exists = false;
    for (let i of response) {
        if (i.id.toString() === newData.id) {
            
            exists = true;
            i.taskDescription = newData.taskDescription;
            i.correctAnswer = newData.correctAnswer;
            try {
                await writeData(path, response);
            } catch (error) {
                return res.status(500).end({ err: "Faild write data." });
            }
            res.status(201).send({ message: "The riddle was successfully update!" });
        }
    }
    if (!exists) {
        res.status(501).send({ err: "The task is not exists." });
    }
}

async function deleteRiddle(req, res) {
    let response;
    try {
        response = await readData(path);
    } catch (err) {
        return res.status(500).send({ err: "Faild read data." });
    }
    const newData = req.body;
    // console.log(response, newData);
    
    let exists = false;
    for (let i in response) {
        if (response[i].id.toString() === newData.id) {
            exists = true;
            response.splice(i, 1)
            try {
                await writeData(path, response);
            } catch (error) {
                return res.status(500).end({ err: "Faild write data." });
            }
            res.status(200).send({ message: "The riddle was successfully update!" });
        }
    }
    if (!exists) {
        res.status(501).send({ err: "The task is not exists." });
    }
}

async function getId(req, res) {
    let riddles;
    try {
        riddles = await readData(path);
    } catch (err) {
        res.writeHead(500, { "content-type": "application/json" });
        return res.end(JSON.stringify({ err: "Faild read data." }));
    }

    let maxId = riddles.length ? riddles[0].id : 0;
    riddles.forEach(riddle => {
        if (riddle.id > maxId) {
            maxId = riddle.id;
        }
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(Number(maxId) + 1));
}

export {
    getRiddles,
    addRiddle,
    updateRiddle,
    deleteRiddle,
    getId
}