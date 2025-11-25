/**
 * Rotas relacionadas aos ultrassons.
 *
 * Definição:
 * Fornece endpoints para criação e listagem do histórico de ultrassons,
 * utilizando o controller `ultrassomController`.
 *
 * Endpoints:
 * - GET    /historico/:usuarioId : Lista o histórico de ultrassons de um usuário específico para gerar gráficos.
 * - POST   /                     : Cria um novo registro de ultrassom.
 *
 * Observações:
 * - Os dados incluem peso fetal, semana gestacional, tipo de exame e observações.
 * - É utilizado `express.Router` para modularização das rotas.
 */
const express = require('express');
const router = express.Router();
const ultrassomController = require('../controllers/ultrassomController');

router.get('/historico/:usuarioId', ultrassomController.getHistorico);
router.post('/', ultrassomController.createUltrassom);

module.exports = router;