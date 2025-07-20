import { addRiddleDB, deleteRiddleDB, getRiddlesDB, updateRiddleDB } from "../DAL/riddlesDAL.js";

const getRiddles = async (req, res) => {
    let response;
    try {
        response = await getRiddlesDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    res.status(200).send(response);
}

const addRiddle = async (req, res) => {
    let response;
    try {
        response = await getRiddlesDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;
    const existsId = response.some(riddle => riddle.id === data.id);
    if (existsId) {
        return res.status(200).send({ message: "The id already exists." });
    }

    let maxId = Math.max(...response.map(riddle => riddle.id), 0);
    const newData = { id: Number(maxId) + 1, ...data };

    const existsQ = response.some(riddle => riddle.taskDescription === newData.taskDescription && riddle.correctAnswer === newData.correctAnswer);
    if (existsQ) {
        return res.status(200).send({ message: "The question already exists." });
    }

    try {
        await addRiddleDB(newData);
    } catch (error) {
        return res.status(500).send({ err: "Failed write data." });
    }
    res.status(201).send({ message: "The riddle was successfully added!" });
}

const updateRiddle = async (req, res) => {
    let response;
    try {
        response = await getRiddlesDB();
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
            i.numberAsc = data.numberAsc != undefined ? data.numberAsc : "";
            i.name = data.name != undefined ? data.name : "";
            i.level = data.level != undefined ? data.level : "";
            i.taskDescription = data.taskDescription != undefined ? data.taskDescription : "";
            i.correctAnswer = data.correctAnswer != undefined ? data.correctAnswer : "";
            try {
                await updateRiddleDB(numId, i);
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
        response = await getRiddlesDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
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
            try {
                await deleteRiddleDB(numId);
            } catch (error) {
                return res.status(500).send({ err: "Failed write data." });
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