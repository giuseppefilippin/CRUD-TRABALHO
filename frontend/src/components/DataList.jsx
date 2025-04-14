// components/DataList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8800/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => alert("Erro ao carregar dados."));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      await fetch(`http://localhost:8800/users/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleEdit = async (item) => {
    const novoNome = prompt("Digite o novo nome:", item.nome);
    const novaIdade = prompt("Digite a nova idade:", item.idade);
    const novoCPF = prompt("Digite o novo CPF:", item.cpf);

    if (novoNome && novaIdade && novoCPF) {
      await fetch(`http://localhost:8800/users/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novoNome,
          idade: novaIdade,
          cpf: novoCPF,
        }),
      });

      setData(
        data.map((d) =>
          d.id === item.id
            ? { ...d, nome: novoNome, idade: novaIdade, cpf: novoCPF }
            : d
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="title-row">
        <h1>Listando Usuários</h1>
        <button className="btn-add" onClick={() => navigate("/crud")}>
          ➕ Adicionar Usuário
        </button>
      </div>

      <ul className="list">
        {data.map((item) => (
          <li key={item.id} className="li-list">
            <div className="user-container">
              <div className="user-info">
                <p>
                  <strong>Nome:</strong> {item.nome}
                </p>
              </div>

              <div className="btn-group">
                <button
                  className="btn-list"
                  onClick={() => navigate(`/detalhes/${item.id}`)}
                >
                  Mais detalhes
                </button>
                <button
                  className="btn-list"
                  onClick={() => handleDelete(item.id)}
                >
                  Deletar
                </button>
                <button
                  className="btn-list"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
