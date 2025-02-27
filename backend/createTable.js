// Você pode adicionar este script em um arquivo separado (create-table.js)
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Cadastros',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' } // Chave primária
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' } // String
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Erro ao criar tabela:', err);
  } else {
    console.log('Tabela criada com sucesso:', data);
  }
});