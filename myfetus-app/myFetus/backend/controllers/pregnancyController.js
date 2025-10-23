const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createPregnancy = async (req, res) => {
  const { pregnant_id, weeks, is_checked = false, dum, dpp, ccn = 0.0, dgm = 0.0, regularidade_do_ciclo = true, ig_ultrassonografia } = req.body;

  if (!dum || !dpp || !ig_ultrassonografia) {
    return res.status(400).json({ error: 'Campos dum, dpp e ig_ultrassonografia são obrigatórios' });
  }
  try {
    const result = await client.query(
      'INSERT INTO pregnancies (pregnant_id, weeks, is_checked, dum, dpp, ccn, dgm, regularidade_do_ciclo, ig_ultrassonografia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [pregnant_id, weeks, is_checked, dum, dpp, ccn, dgm, regularidade_do_ciclo, ig_ultrassonografia]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPregnancies = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnancies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePregnancy = async (req, res) => {
  try {
    const updatedPregnancy = await updateEntity('pregnancies', req.params.id, req.body);
    if (!updatedPregnancy) return res.status(404).send('Gravidez não encontrada');
    res.json(updatedPregnancy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDPP = async (req, res) => {
  try {
    const dum = await client.query('SELECT dum FROM pregnancies');
    const dpp = calculateDPPfromDUM(dum);
    const updatedPregnancy = await updateEntity('pregnancies', dpp);
    if (!updatedPregnancy) return res.status(404).send('Gravidez não encontrada');
    res.json(updatedPregnancy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function calculateDPPfromDUM(dum) {
  const dumDate = new Date(dum);
  const dpp = new Date(dumDate);
  dpp.setDate(dpp.getDate() + 1);
  dpp.setMonth(dpp.getMonth() - 3);
  dpp.getFullYear(dpp.getFullYear() + 1);

  return dpp.toISOString().split('T')[0];
}

module.exports = { 
  createPregnancy, 
  getPregnancies, 
  updatePregnancy,
  updateDPP };