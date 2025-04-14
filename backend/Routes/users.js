import express from "express";
import { getUsers, deleteUser, updateUser, addUser, getUserById } from "../Controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);     
router.get("/users/:id", getUserById)
router.delete("/users/:id", deleteUser);  // Rota para deletar usuário
router.put("/users/:id", updateUser);     // Rota para editar usuário
router.post("/users", addUser);       // Rota para adicionar usuário

export default router;
