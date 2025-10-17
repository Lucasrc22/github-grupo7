// backend.js
require('dotenv').config(); // caso use .env
const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configura o cliente PostgreSQL usando as variáveis de ambiente do Docker Compose
const client = new Client({
  user: process.env.PG_USER || 'myuser',
  host: process.env.PG_HOST || 'db',
  database: process.env.PG_DATABASE || 'mydatabase',
  password: process.env.PG_PASSWORD || 'mypassword',
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
});

// Teste de conexão inicial (opcional)
async function testDatabaseConnection() {
  try {
    await client.connect();
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
  }
}
testDatabaseConnection();

// Rotas do backend
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong!' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users LIMIT 5;');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar usuários:', error.message);
    res.status(500).json({ error: 'Erro ao consultar usuários' });
  }
});

// Inicia o servidor Express
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend rodando em http://0.0.0.0:${PORT}`);
});
