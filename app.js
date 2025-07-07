import http from "http";
import { getRiddles, addRiddle, updateRiddle, deleteRiddle } from "./service/riddle.services.js";

const server = http.createServer(async (req, res) => {
    if (req.method.toUpperCase() === "GET" && req.url === "/riddles") {
        getRiddles(req, res);
    } else if (req.method.toUpperCase() === "POST" && req.url === "/riddles/addRiddle") {
        addRiddle(req, res)
    } else if (req.method.toUpperCase() === "PUT" && req.url === "/riddles/updateRiddle") {
        updateRiddle(req, res)
    } else if (req.method.toUpperCase() === "DELETE" && req.url === "/riddles/deleteRiddle") {
        deleteRiddle(req, res)
    } else if (req.url === "/") {
        res.end("API runing!");
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page not found!");
    }
})

server.listen(3007, () => {
    console.log("Server runing on port: 3007");
})