import express from "express";
import { getRiddles, addRiddle, updateRiddle, deleteRiddle, getId } from "./service/riddle.services.js";

const app = express()
app.use(express.json());

app.get('/riddles', (req, res) => {
    getRiddles(req, res);
})

app.post('/riddles/addRiddle', (req, res) => {
    addRiddle(req, res);
})

app.put('/riddles/updateRiddle', (req, res) => {
    updateRiddle(req, res);
})

app.delete('/riddles/deleteRiddle', (req, res) => {
    deleteRiddle(req, res);
})

app.get('/riddles/getId', (req, res) => {
    getId(req, res);
})

app.use((req, res) => {
    res.status(404).send("page is not defound")
})

app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
})