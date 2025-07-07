import http from "http";
import { readData } from "./riddlesDAL.js";

const server = http.createServer(async (req, res) => {
    if (req.method.toUpperCase() === "GET" && req.url === "/riddles") {
        let response;
        try {
            response = await readData("./riddles.txt");
        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" });
            res.end(JSON.stringify({ err: "Faild read data." }));
        }
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(response));
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