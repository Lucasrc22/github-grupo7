const client = require('../backend');

async function updateEntity(table, id, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const query = `UPDATE ${table} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${keys.length + 1} RETURNING *`;

  const result = await client.query(query, [...values, id]);
  return result.rows[0];
}

module.exports = updateEntity