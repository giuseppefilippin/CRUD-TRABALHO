import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MoreInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8800/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => alert("Erro ao buscar usuário."));
  }, [id]);

  if (!user) return <p>Carregando usuário...</p>;

  return (
    <div className="container">
      <h2>Mais Detalhes do Usuário</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Idade:</strong> {user.idade}</p>
      <p><strong>CPF:</strong> {user.cpf}</p>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};

export default MoreInfo;
