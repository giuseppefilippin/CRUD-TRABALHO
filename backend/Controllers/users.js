import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios ORDER BY id DESC";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM usuarios WHERE id = ?";
    
    db.query(q, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, idade, cpf, email, anoNasc } = req.body;

    const q = "UPDATE usuarios SET nome = ?, idade = ?, cpf = ?, email = ?, anoNasc = ? WHERE id = ?";
    
    db.query(q, [nome, idade, cpf, email, anoNasc, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
};

export const addUser = (req, res) => {
    const { nome, idade, cpf, email, anoNasc } = req.body;
    const q = "INSERT INTO usuarios (nome, idade, cpf, email, anoNasc) VALUES (?, ?, ?, ?, ?)";
  
    db.query(q, [nome, idade, cpf, email, anoNasc], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "Usuário criado com sucesso!", id: result.insertId });
    });
  };
  
  export const getUserById = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM usuarios WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar usuário", details: err });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      return res.status(200).json(data[0]); // Retorna o único usuário
    });
  };
  