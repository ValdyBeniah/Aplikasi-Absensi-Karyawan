import express from "express";
import {
    getWfh,
    getWfhById,
    createWfh,
    updateWfh,
    deleteWfh
} from "../controllers/Wfh.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/wfh', verifyUser, getWfh);
router.get('/wfh/:id', verifyUser, getWfhById);
router.post('/wfh', verifyUser, createWfh);
router.patch('/wfh/:id', verifyUser, updateWfh);
router.delete('/wfh/:id', verifyUser, deleteWfh);
router.get('/user-role', verifyUser, (req, res) => {
    res.json({ role: req.role });
});

export default router;