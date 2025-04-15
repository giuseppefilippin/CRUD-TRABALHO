import "./MoreInfo.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MoreInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8800/users/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            alert("Usuário não encontrado.");
            navigate("/"); // Volta pra home
          } else {
            throw new Error("Erro ao buscar usuário.");
          }
          return;
        }

        const data = await res.json();
        const userData = Array.isArray(data) ? data[0] : data;
        setUser(userData);
      } catch (error) {
        console.error("Erro no fetch:", error);
        alert("Erro ao buscar usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) return <p>Carregando usuário...</p>;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div className="container">
      <h2>Mais Detalhes do Usuário</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nome:</strong> {user.nome}
      </p>
      <p>
        <strong>Idade:</strong> {user.idade}
      </p>
      <p>
        <strong>CPF:</strong> {user.cpf}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Ano Nascimento:</strong> {user.anoNasc}
      </p>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};

export default MoreInfo;
