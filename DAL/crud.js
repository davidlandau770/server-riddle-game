import fs from "fs/promises";

const readData = async (path) => {
    return JSON.parse(await fs.readFile(path, "utf-8"));
}

const writeData = async (path, data) => {
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }
    return await fs.writeFile(path, data);
}

export {
    readData,
    writeData
}
