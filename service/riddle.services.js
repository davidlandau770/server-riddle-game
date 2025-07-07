import { write } from "fs";
import { readData, writeData } from "../DAL/crud";

async function getRiddles(req, res) {
    let response;
    try {
        response = await readData("./dbRiddles.txt");
    } catch (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ err: "Faild read data." }));
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(response));
}

async function addRiddle(req, res) {
    let response;
    let read;
    try {
        read = await readData("./dbRiddles.txt");
    } catch (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ err: "Faild read data." }));
    }
    const body = [];

    req.on("data", chunk => {
        body.push(chunk);
    });

    req.on("end", async() => {
        const dataStr = JSON.parse(Buffer.concat(body).toString());
        console.log("dataStr:", dataStr);
        response.push(dataStr)
        let write;
        write = await writeData("./dbRiddles.txt", response);
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "The riddle was successfully added!" }));
    });
}

async function updateRiddle(req, res) {

}

async function deleteRiddle(req, res) {

}


export {
    getRiddles,
    addRiddle,
    updateRiddle,
    deleteRiddle
}