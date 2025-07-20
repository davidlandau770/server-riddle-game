import { connectToMongodb } from "../db/mongoDB.js"

const getRiddlesDB = async () => {
    const db = await connectToMongodb();
    return db.collection('riddles').find().toArray();
}

const addRiddleDB = async (data) => {
    const db = await connectToMongodb();
    return db.collection("riddles").insertOne(data);
}

const updateRiddleDB = async (id, data) => {
    const db = await connectToMongodb();
    console.log(data);
    return db.collection('riddles').updateOne(
        { id: id },
        { $set: data }
    )
}

const deleteRiddleDB = async (id) => {
    const db = await connectToMongodb();
    return db.collection('riddles').deleteOne(
        { id: id }
    )
}

export {
    getRiddlesDB,
    addRiddleDB,
    updateRiddleDB,
    deleteRiddleDB
}