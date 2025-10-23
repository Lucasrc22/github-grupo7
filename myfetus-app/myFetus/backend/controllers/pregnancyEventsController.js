const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

const createEvent = async (req, res) => {
  const { pregnancy_id, description, event_date } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pregnancy_events (pregnancy_id, description, event_date) VALUES ($1, $2, $3) RETURNING *',
      [pregnancy_id, description, event_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnancy_events');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePregnancyEvent = async (req, res) => {
  try {
    const updatedEvent = await updateEntity('pregnancy_events', req.params.id, req.body);
    if (!updatedEvent) return res.status(404).send('Evento não encontrado');
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  createEvent, 
  getEvents, 
  updatePregnancyEvent };