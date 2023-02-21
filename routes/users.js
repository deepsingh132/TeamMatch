import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, updateUser);

//DELETE
router.delete("/:id",verifyToken, deleteUser);

//GET USER
router.get("/:id", getUser);

export default router;