const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;  // Porta para o backend

// Middleware
app.use(cors());  // Permite que o frontend acesse o backend
app.use(bodyParser.json());  // Para parsear requisições com JSON

// Armazenando cadastros em memória (em um array)
let cadastros = [];

// Rota POST para cadastro de usuário
app.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;

    // Validação simples
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e Email são obrigatórios' });
    }

    // Simulando o processamento do cadastro
    const novoCadastro = { nome, email };
    cadastros.push(novoCadastro);  // Adicionando o cadastro ao array

    res.status(200).json({ message: 'Cadastro realizado com sucesso!', data: novoCadastro });
});

// Rota GET para consultar os cadastros
app.get('/cadastros', (req, res) => {
    res.status(200).json({ cadastros });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});
