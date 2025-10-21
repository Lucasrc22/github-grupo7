const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createEvent = async (req, res) => {
  const { pregnancy_id, description, event_date } = req.body;

  if (!pregnancy_id || !description || !event_date)
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });

  try {
    const result = await client.query(
      'INSERT INTO pregnancy_events (pregnancy_id, description, event_date) VALUES ($1, $2, $3) RETURNING *',
      [pregnancy_id, description, event_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar evento:', err.message);
    res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

const getEvents = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnancy_events');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar eventos:', err.message);
    res.status(500).json({ error: 'Erro ao listar eventos.' });
  }
};

const updatePregnancyEvent = async (req, res) => {
  try {
    const updatedEvent = await updateEntity('pregnancy_events', req.params.id, req.body);
    if (!updatedEvent)
      return res.status(404).json({ error: 'Evento não encontrado.' });
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao atualizar evento:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar evento.' });
  }
};

module.exports = { createEvent, getEvents, updatePregnancyEvent };
