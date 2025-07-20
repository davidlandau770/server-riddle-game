import express from "express";
import { addRiddle, deleteRiddle, getRiddles, updateRiddle } from "../controllers/riddles.js";

const riddles = express.Router();

riddles.get('/', getRiddles);
riddles.post('/addRiddle', addRiddle);
riddles.put('/updateRiddle/:id', updateRiddle);
riddles.delete('/deleteRiddle/:id', deleteRiddle);

export {
    riddles
}