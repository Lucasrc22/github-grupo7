// server.js
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

//Prefixo /api para padronização das rotas
app.use('/api/users', userRoutes);
app.use('/api/pregnants', pregnantRoutes);
app.use('/api/pregnancies', pregnancyRoutes);
app.use('/api/pregnancy-events', pregnancyEventsRoutes);
app.use('/api/pregnant-documents', documentsRoutes);
app.use('/api/medicoes', medicoesRoutes);

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
