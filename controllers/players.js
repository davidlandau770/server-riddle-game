import { getPlayersDB, updatePlayerDB } from "../DAL/playersDAL.js";

const getPlayers = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    res.status(200).send(response);
}

// const addPlayer = async (req, res) => {
//     let response;
//     try {
//         response = await getPlayersDB();
//     } catch (err) {
//         return res.status(500).send({ err: "Failed read data." });
//     }
//     const data = req.body;
//     const exists = response.some(player => player.username === data.username);
//     if (exists) {
//         return res.status(409).send({ message: "The player already exists." });
//     }

//     try {
//         await addPlayerDB(data);
//     } catch (error) {
//         return res.status(500).send({ err: "Failed write data." });
//     }
//     res.status(200).send({ message: "The player was successfully added!" });
// }

const updatePlayer = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (err) {
        return res.status(500).send({ err: "Failed read data." });
    }
    const data = req.body;
    const name = req.params.name;
    let exists = false;
    for (let i of response) {
        if (i.username === name) {
            exists = true;
            console.log(name, data.best_time);
            try {
                await updatePlayerDB(name, data.best_time);
            } catch (error) {
                return res.status(500).send({ err: "Failed write data." });
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
    // addPlayer,
    updatePlayer
}