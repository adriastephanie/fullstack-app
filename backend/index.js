const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
require('dotenv').config(); // Para gerenciar as credenciais da AWS

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Inicializar o cliente DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Cadastros'; // Nome da tabela no DynamoDB

// Rota POST para cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { nome, email } = req.body;

    // Validação simples
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e Email são obrigatórios' });
    }

    // Criar um objeto para o DynamoDB com ID único
    const timestamp = new Date().getTime();
    const novoCadastro = {
        id: `${timestamp}`, // Usar timestamp como ID único
        nome,
        email,
        dataCadastro: new Date().toISOString()
    };

    // Parâmetros para inserir no DynamoDB
    const params = {
        TableName: TABLE_NAME,
        Item: novoCadastro
    };

    try {
        // Inserir o cadastro no DynamoDB
        await dynamodb.put(params).promise();
        res.status(200).json({
            message: 'Cadastro realizado com sucesso!',
            data: novoCadastro
        });
    } catch (error) {
        console.error('Erro ao cadastrar no DynamoDB:', error);
        res.status(500).json({
            error: 'Erro ao processar o cadastro',
            details: error.message
        });
    }
});

// Rota GET para consultar os cadastros
app.get('/cadastros', async (req, res) => {
    const params = {
        TableName: TABLE_NAME
    };

    try {
        // Buscar todos os cadastros no DynamoDB
        const result = await dynamodb.scan(params).promise();
        res.status(200).json({ cadastros: result.Items });
    } catch (error) {
        console.error('Erro ao consultar cadastros no DynamoDB:', error);
        res.status(500).json({
            error: 'Erro ao consultar cadastros',
            details: error.message
        });
    }
});

// Rota GET para buscar um cadastro específico por ID
app.get('/cadastro/:id', async (req, res) => {
    const { id } = req.params;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    try {
        const result = await dynamodb.get(params).promise();

        if (result.Item) {
            res.status(200).json(result.Item);
        } else {
            res.status(404).json({ error: 'Cadastro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cadastro no DynamoDB:', error);
        res.status(500).json({
            error: 'Erro ao buscar cadastro',
            details: error.message
        });
    }
});

// Rota PUT para atualizar um cadastro
app.put('/cadastro/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    // Validação simples
    if (!nome && !email) {
        return res.status(400).json({ error: 'Forneça pelo menos um campo para atualizar' });
    }

    // Construindo expressões para atualizar apenas os campos fornecidos
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (nome) {
        updateExpressions.push('#nome = :nome');
        expressionAttributeValues[':nome'] = nome;
        expressionAttributeNames['#nome'] = 'nome';
    }

    if (email) {
        updateExpressions.push('#email = :email');
        expressionAttributeValues[':email'] = email;
        expressionAttributeNames['#email'] = 'email';
    }

    // Adicionar data de atualização
    updateExpressions.push('#dataAtualizacao = :dataAtualizacao');
    expressionAttributeValues[':dataAtualizacao'] = new Date().toISOString();
    expressionAttributeNames['#dataAtualizacao'] = 'dataAtualizacao';

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: 'ALL_NEW'
    };

    try {
        const result = await dynamodb.update(params).promise();
        res.status(200).json({
            message: 'Cadastro atualizado com sucesso!',
            data: result.Attributes
        });
    } catch (error) {
        console.error('Erro ao atualizar cadastro no DynamoDB:', error);
        res.status(500).json({
            error: 'Erro ao atualizar cadastro',
            details: error.message
        });
    }
});

// Rota DELETE para remover um cadastro
app.delete('/cadastro/:id', async (req, res) => {
    const { id } = req.params;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    try {
        await dynamodb.delete(params).promise();
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Erro ao excluir cadastro no DynamoDB:', error);
        res.status(500).json({
            error: 'Erro ao excluir cadastro',
            details: error.message
        });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});