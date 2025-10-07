const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createPregnant = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pregnants (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPregnants = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePregnant = async (req, res) => {
  try {
    const updatedPregnant = await updateEntity('pregnants', req.params.id, req.body);
    if (!updatedPregnant) return res.status(404).send('Gestante não encontrada');
    res.json(updatedPregnant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  createPregnant, 
  getPregnants, 
  updatePregnant };