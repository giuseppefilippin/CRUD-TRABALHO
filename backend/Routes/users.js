import express from "express";
import { getUsers, deleteUser, updateUser, addUser } from "../Controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);      // Rota para listar usuários
router.delete("/users/:id", deleteUser);  // Rota para deletar usuário
router.put("/users/:id", updateUser);     // Rota para editar usuário
router.post("/users", addUser);       // Rota para adicionar usuário

export default router;
