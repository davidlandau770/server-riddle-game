import express from "express";
import { getPlayers, updatePlayer } from "../controllers/players.js";

const players = express.Router();

players.get('/', getPlayers);
// players.post('/addPlayer', addPlayer);
players.put('/updatePlayer/:name', updatePlayer);

export {
    players
}
