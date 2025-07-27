import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addPlayerDB, getPlayersDB } from "../DAL/playersDAL.js";

const signup = async (req, res) => {
    let response;
    try {
        response = await getPlayersDB();
    } catch (error) {
        return res.status(500).json({ msg: `getPlayers: ${error}` });
    }
    const name = req.body.username;
    const player = response.some(player => player.username === name)
    if (player) {
        return res.status(409).json({ msg: "The username already exists." });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newPlayer = {
        username: name,
        password: hashedPassword,
    }
    console.log(newPlayer);
    let result
    try {
        result = await addPlayerDB(newPlayer);
    } catch (error) {
        return res.status(500).send({ err: "Failed write data." });
    }
    res.status(200).send({ message: "The player has been successfully registered!" });
}

const login = async (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    let response;
    try {
        response = await getPlayersDB();
    } catch (error) {
        return res.status(500).json({ msg: `getPlayers: ${error}` });
    }
    const currentPalyer = response.find(player => player.username === name);
    if (!currentPalyer) return res.status(404).json({ msg: "User not found." });
    const hashedPassword = currentPalyer.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    let token;
    try {
        token = createToken(currentPalyer);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ getToken: error })
    }
    // res.cookie("token", token, { httpOnly: true, sameSite: true })
    res.status(200).header("authorization", token).json({ msg: "Verified" });
}

const guest = async (req, res) => {

}

const createToken = (player) => {
    const token = jwt.sign(
        {
            id: player.id,
            username: player.username,
            role: player.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token
}

export {
    signup,
    login,
    guest
}