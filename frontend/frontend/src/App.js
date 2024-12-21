import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Vamos importar o arquivo CSS

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/cadastro', { nome, email });
      setStatus({ message: response.data.message, type: 'success' });
    } catch (error) {
      setStatus({ message: 'Erro ao enviar cadastro', type: 'error' });
      console.error(error);
    }
  };

  return (
      <div className="App">
        <div className="container">
          <h1>Cadastro de Usuário</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="nome">Nome:</label>
              <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
              />
            </div>
            <button type="submit" className="submit-btn">Cadastrar</button>
          </form>
          <div className={`status-message ${status?.type}`}>
            {status && <p>{status.message}</p>}
          </div>
        </div>
      </div>
  );
}

export default App;
