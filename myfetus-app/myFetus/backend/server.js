/**
 * server.js
 *
 * Servidor principal do backend do projeto MyFetus.
 * Configura middlewares, rotas e inicializa o servidor Express.
 *
 * Funcionalidades:
 * 1. Configuração do CORS:
 *    - Permite requisições do frontend (React, Expo, etc.).
 *    - Em produção, deve-se limitar o `origin` ao domínio autorizado.
 *
 * 2. Middlewares:
 *    - `express.json()`: interpreta requisições com JSON.
 *    - `express.urlencoded()`: interpreta formulários.
 *
 * 3. Rotas importadas:
 *    - /api/users           → users.js
 *    - /api/pregnants       → pregnants.js
 *    - /api/pregnancies     → pregnancies.js
 *    - /api/pregnancyEvents → pregnancyEvents.js
 *    - /api/documents       → documents.js
 *    - /api/medicoes        → medicoes.js
 *
 * 4. Rota de teste:
 *    - GET /ping → retorna mensagem para verificar se o backend está ativo.
 *
 * 5. Inicialização do servidor:
 *    - Porta configurável via `process.env.PORT` (default 3000).
 *    - Host configurado como '0.0.0.0' para permitir conexões externas
 *      dentro do container Docker.
 *
 * Observações:
 * - Este arquivo deve ser o ponto de entrada do backend.
 * - Todas as rotas estão prefixadas com `/api` para padronização.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Configuração do CORS — permite requisições do frontend (por exemplo, React ou Expo)
app.use(cors({
  origin: '*', // em produção, substitua pelo domínio do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Middlewares para interpretar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importação das rotas
const userRoutes = require('./routes/users');
const pregnantRoutes = require('./routes/pregnants');
const pregnancyRoutes = require('./routes/pregnancies');
const pregnancyEventsRoutes = require('./routes/pregnancyEvents');
const documentsRoutes = require('./routes/documents');
const medicoesRoutes = require('./routes/medicoes');
const ultrassomRoutes = require('./routes/ultrassomRoutes');

//Prefixo /api para padronização das rotas
app.use('/api/users', userRoutes);
app.use('/api/pregnants', pregnantRoutes);
app.use('/api/pregnancies', pregnancyRoutes);
app.use('/api/pregnancyEvents', pregnancyEventsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/medicoes', medicoesRoutes);
app.use('/api/ultrassons', ultrassomRoutes);

//Rota de teste (para verificar se o backend está no ar)
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong! 🏓 Backend funcionando corretamente.' });
});

//Inicializa o servidor
const PORT = process.env.PORT || 3000;

//importante: use '0.0.0.0' para aceitar conexões externas dentro do container Docker
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
});
