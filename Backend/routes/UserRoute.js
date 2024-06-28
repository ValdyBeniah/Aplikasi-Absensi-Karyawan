import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, hrdOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, hrdOnly, getUsers);
router.get('/users/:id', verifyUser, hrdOnly, getUserById);
router.post('/users', verifyUser, hrdOnly, createUser);
router.patch('/users/:id', verifyUser, hrdOnly, updateUser);
router.delete('/users/:id', verifyUser, hrdOnly, deleteUser);

export default router;
