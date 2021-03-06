import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    })
  }, [])

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, resp.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(item => item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
              </button>
          </li>
        )
        )}
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar
        </button>
    </div>
  );
}

export default App;
