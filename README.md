# Projeto de Fullstack
Projeto criado para estudar backend, criar uma api simples e testar o funcionamento de um sistema de envio pelo frontend.
Criar uma aplicação onde o frontend envia os dados de um formulário (nome e email) para o backend (API) que, por sua vez, processa e retorna uma resposta.

## Criação do repositório e do projeto

O projeto foi criado da seguinte maneira

criar a pasta do repo

`mkdir fullstack-app`

entrar na pasta para criar demais pastas

`cd fullstack-app`

`mkdir frontend backend`

Inicializar o frontend (Dentro da pasta frontend)

`npx create-react-app frontend`

```sh
cd frontend
npm install axios
```
- Axios para enviar uma requisição POST para a API do backend pelo frontend.


Inicializar o backend (Dentro da pasta backend)

`npm init -y`

`npm install express cors body-parser`

- express: Framework para o servidor HTTP.
- cors: Para permitir que o frontend se conecte ao backend (Cross-Origin Resource Sharing).
- body-parser: Para interpretar as requisições JSON.


## Configuração do Backend

o arquivo index.js foi criado  no servidor Express e a rota POST para receber os dados do cadastro e GET para consultar

para rodar o backend basta 

```sh
cd backend
node index.js
```

## Configuração do Frontend

No diretório frontend, foi criado uma página simples com um formulário de cadastro. O formulário irá coletar os dados de nome e email, e enviá-los para a API do backend.
O formulário fica no arquivo src/App.js

para rodar o frontend basta:

```sh
cd frontend/frontend
npm start
```
O frontend estará disponível em http://localhost:3000.


### O que foi feito

- Como configurar um backend simples com Express
- Como criar um frontend básico com React
- Como fazer requisições POST do frontend para o backend usando Axios.
- Como garantir a comunicação entre frontend e backend rodando em portas diferentes localmente.



