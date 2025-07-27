import express from "express";
// import cors from "cors";
import { configRoutes } from "./routes/configRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { config } from "dotenv"
config()

const PORT = process.env.PORT;

const app = express()
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// }));

app.use(express.json());

app.use((req, res ,next) => {
    console.log(req.method);
    next()
})

configRoutes(app)

app.use('/', notFound)

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
})