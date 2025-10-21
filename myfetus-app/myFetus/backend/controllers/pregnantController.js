const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createPregnant = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id)
    return res.status(400).json({ error: 'Campo user_id é obrigatório.' });

  try {
    const result = await client.query(
      'INSERT INTO pregnants (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar gestante:', err.message);
    res.status(500).json({ error: 'Erro ao criar gestante.' });
  }
};

const getPregnants = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnants');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar gestantes:', err.message);
    res.status(500).json({ error: 'Erro ao buscar gestantes.' });
  }
};

const updatePregnant = async (req, res) => {
  try {
    const updatedPregnant = await updateEntity('pregnants', req.params.id, req.body);
    if (!updatedPregnant)
      return res.status(404).json({ error: 'Gestante não encontrada.' });
    res.json(updatedPregnant);
  } catch (err) {
    console.error('Erro ao atualizar gestante:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar gestante.' });
  }
};

module.exports = { createPregnant, getPregnants, updatePregnant };
