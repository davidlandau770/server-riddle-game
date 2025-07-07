import http from "http";
import { getRiddles } from "./service/riddle.services.js";

const server = http.createServer(async (req, res) => {
    if (req.method.toUpperCase() === "GET" && req.url === "/riddles") {
        getRiddles(req, res);
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