/**
 * Controlador responsável por gerenciar informações das gestantes.
 * Inclui funções para criação, listagem e atualização de registros de gestantes.
 */
const client = require('../backend');
const updateEntity = require('../utils/updateEntity');

/**
 * Função 1
 * Cria um novo registro de gestante vinculado a um usuário.
 * 
 * Parâmetros:
 *  - req[Object]: Requisição contendo `body.user_id` (ID do usuário associado).
 *  - res[Object]: Resposta HTTP.
 * 
 * Retorno:
 *  - [JSON]: Registro da gestante criado.
 */
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

/**
 * Função 2
 * Retorna todas as gestantes cadastradas.
 * 
 * Parâmetros:
 *  - req[Object]: Requisição HTTP.
 *  - res[Object]: Resposta HTTP.
 * 
 * Retorno:
 *  - [JSON]: Lista de gestantes existentes no banco de dados.
 */
const getPregnants = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Função 3
 * Atualiza os dados de uma gestante existente.
 * 
 * Parâmetros:
 *  - req[Object]: Requisição contendo `params.id` (ID da gestante) e `body` (campos a atualizar).
 *  - res[Object]: Resposta HTTP.
 * 
 * Retorno:
 *  - [JSON]: Registro atualizado da gestante.
 */
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
  updatePregnant
};