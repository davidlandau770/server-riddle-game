import express from "express";
import { configRoutes } from "./routes/configRoutes.js";
// import { config } from "dotenv";
// config();

const PORT = process.env.PORT;
const app = express()
app.use(express.json());

configRoutes(app)

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
})