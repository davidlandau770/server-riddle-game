import fs from "fs/promises";

async function readData(path) {
    return JSON.parse(await fs.readFile(path, "utf-8"));
}

async function writeData(path, data) {
    if (typeof data !== string) {
        data = JSON.stringify(data);
    }
    return await fs.writeFile(path, data);
}
export {
    readData,
    writeData
}