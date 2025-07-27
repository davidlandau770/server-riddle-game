import express from "express";
import { guest, login, signup } from "../controllers/login.js";

const user = express.Router();

user.post('/signup', signup);
user.post('/login', login);
user.post('/guest', guest);

export {
    user
}
