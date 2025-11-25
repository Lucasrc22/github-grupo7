/**
 *  gerenciar histórico de ultrassons.
 * 
const client = require('../backend'); 

/**
 * Função 1
 * Retorna o histórico de ultrassons de um usuário específico.
 * * Parâmetros:
 * - req[Object]: Requisição contendo `params.usuarioId`.
 * - res[Object]: Resposta HTTP.
 * * Retorno:
 * - [JSON]: Lista de exames ordenados por data.
 */
const getHistorico = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const result = await client.query(
      'SELECT * FROM ultrassons WHERE usuario_id = $1 ORDER BY data_exame ASC',
      [usuarioId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar ultrassons:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Função 2 (Opcional -  criar pelo App no futuro)
 * Cria um novo registro de ultrassom.
 */
const createUltrassom = async (req, res) => {
  const { usuario_id, data_exame, semana_gestacional, peso_fetal, tipo_exame, observacoes } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO ultrassons (usuario_id, data_exame, semana_gestacional, peso_fetal, tipo_exame, observacoes) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [usuario_id, data_exame, semana_gestacional, peso_fetal, tipo_exame, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportação no final
module.exports = {
  getHistorico,
  createUltrassom
};