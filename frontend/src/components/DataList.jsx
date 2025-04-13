import React, { useEffect, useState } from "react";

const DataList = () => {
  const [data, setData] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", idade: "", cpf: "" });

  useEffect(() => {
    fetch("http://localhost:8800/users")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const toggleDetails = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

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

  const handleAddUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8800/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok) {
      const newUser = { id: result.id, ...formData };
      setData([newUser, ...data]);
      setFormData({ nome: "", idade: "", cpf: "" });
      setShowForm(false);
    } else {
      alert("Erro ao adicionar usuário.");
    }
  };

  return (
    <div>
      <div className="title-row">
        
        <h1 className="title">Listando Usuários:</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "➕ Adicionar Usuário"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="add-form">
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
            onChange={(e) =>
              setFormData({ ...formData, idade: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            required
          />
          <button type="submit" className="btn-list">
            Salvar
          </button>
        </form>
      )}

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
                  onClick={() => toggleDetails(item.id)}
                >
                  {expandedItemId === item.id
                    ? "Ocultar detalhes"
                    : "Mais detalhes"}
                </button>
                <button
                  className="btn-list"
                  onClick={() => handleDelete(item.id)}
                >
                  Deletar
                </button>
                <button className="btn-list" onClick={() => handleEdit(item)}>
                  Editar
                </button>
              </div>
            </div>

            <div
              className={`details-container ${
                expandedItemId === item.id ? "active" : ""
              }`}
            >
              <p>
                <strong>Idade:</strong> {item.idade}
              </p>
              <p>
                <strong>CPF:</strong> {item.cpf}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
