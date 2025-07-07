import { readData } from "../riddlesDAL";

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

export {
    getRiddles
}