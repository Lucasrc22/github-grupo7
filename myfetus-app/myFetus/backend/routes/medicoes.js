// routes/medicoes.js
const express = require('express');
const router = express.Router();
const { Client } = require('pg');
require('dotenv').config();

// Conexão com o banco
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
client.connect();

// Rota POST para salvar medição
router.post('/', async (req, res) => {
  try {
    const { idade_gestacional_semanas, comp_femur_mm } = req.body;

    if (
      typeof idade_gestacional_semanas !== 'number' ||
      typeof comp_femur_mm !== 'number'
    ) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const comp_fetal_estimado_cm = 6.18 + 0.59 * comp_femur_mm;

    const insertQuery = `
      INSERT INTO medicao_femur (idade_gestacional_semanas, comp_femur_mm, comp_fetal_estimado_cm)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const result = await client.query(insertQuery, [
      idade_gestacional_semanas,
      comp_femur_mm,
      comp_fetal_estimado_cm,
    ]);

    res.status(201).json({
      mensagem: 'Medição salva com sucesso!',
      medicao: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar medição' });
  }
});

module.exports = router;