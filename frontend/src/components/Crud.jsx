import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Crud = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: "", idade: "", cpf: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8800/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Usuário criado com sucesso!");
      navigate("/");
    } else {
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Usuário</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={formData.idade}
          onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={formData.cpf}
          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          required
        />
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};

export default Crud;
