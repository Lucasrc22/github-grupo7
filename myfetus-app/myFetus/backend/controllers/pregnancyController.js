const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createPregnancy = async (req, res) => {
  const { pregnant_id, weeks, is_checked = false, dum, dpp, ccn = 0.0, dgm = 0.0, regularidade_do_ciclo = true, ig_ultrassonografia } = req.body;

  if (!dum || !dpp || !ig_ultrassonografia)
    return res.status(400).json({ error: 'Campos DUM, DPP e IG Ultrassonografia são obrigatórios.' });

  try {
    const result = await client.query(
      'INSERT INTO pregnancies (pregnant_id, weeks, is_checked, dum, dpp, ccn, dgm, regularidade_do_ciclo, ig_ultrassonografia) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [pregnant_id, weeks, is_checked, dum, dpp, ccn, dgm, regularidade_do_ciclo, ig_ultrassonografia]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar gravidez:', err.message);
    res.status(500).json({ error: 'Erro ao criar gravidez.' });
  }
};

const getPregnancies = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnancies');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar gestações:', err.message);
    res.status(500).json({ error: 'Erro ao buscar gestações.' });
  }
};

const updatePregnancy = async (req, res) => {
  try {
    const updatedPregnancy = await updateEntity('pregnancies', req.params.id, req.body);
    if (!updatedPregnancy)
      return res.status(404).json({ error: 'Gravidez não encontrada.' });
    res.json(updatedPregnancy);
  } catch (err) {
    console.error('Erro ao atualizar gravidez:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar gravidez.' });
  }
};

module.exports = { createPregnancy, getPregnancies, updatePregnancy };
