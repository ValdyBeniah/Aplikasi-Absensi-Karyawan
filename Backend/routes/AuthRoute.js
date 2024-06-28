import express from "express";
import { Login, Me, LogOut } from "../controllers/Auth.js";

const router = express.Router();

router.post('/login', Login);
router.get('/me', Me);
router.delete('/logout', LogOut);

export default router;
