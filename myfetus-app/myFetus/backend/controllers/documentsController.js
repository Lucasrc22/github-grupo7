const path = require('path');
const fs = require('fs');
const client = require('../backend'); // conexão com o banco de dados (ver observação abaixo)
const updateEntity = require('../utils/updateEntity');

/**
 Upload de documento associado a uma gestante
 */
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Nenhum arquivo enviado.');

    const { pregnant_id, document_name, document_type } = req.body;
    if (!pregnant_id) return res.status(400).send('pregnant_id é obrigatório.');
    if (!document_name) return res.status(400).send('document_name é obrigatório.');

    const file_path = req.file.path;

    const result = await client.query(
      `INSERT INTO pregnant_documents 
        (pregnant_id, document_name, document_type, file_path) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [pregnant_id, document_name, document_type, file_path]
    );

    return res.status(201).json({
      message: '📁 Documento enviado e associado com sucesso!',
      document: result.rows[0],
    });
  } catch (err) {
    console.error('Erro em uploadDocument:', err);
    res.status(500).json({ error: 'Erro ao enviar o documento.', detail: err.message });
  }
};

/**
 Buscar documentos de uma gestante específica
 */
const getDocuments = async (req, res) => {
  const { pregnant_id } = req.query;
  if (!pregnant_id) {
    return res.status(400).json({ error: 'Parâmetro pregnant_id é obrigatório.' });
  }

  try {
    const result = await client.query(
      'SELECT * FROM pregnant_documents WHERE pregnant_id = $1 ORDER BY id DESC',
      [pregnant_id]
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro em getDocuments:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 Buscar documento por ID
 */
const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'SELECT * FROM pregnant_documents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Documento não encontrado.' });

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro em getDocumentById:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 Deletar documento
 */
const deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await client.query(
      'SELECT * FROM pregnant_documents WHERE id = $1',
      [id]
    );

    if (doc.rows.length === 0)
      return res.status(404).json({ error: 'Documento não encontrado.' });

    const { file_path } = doc.rows[0];

    if (file_path && fs.existsSync(file_path)) fs.unlinkSync(file_path);

    await client.query('DELETE FROM pregnant_documents WHERE id = $1', [id]);

    return res.json({ message: 'Documento removido com sucesso.' });
  } catch (err) {
    console.error('Erro em deleteDocument:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
Atualizar documento
 */
const updateDocument = async (req, res) => {
  try {
    const updatedDoc = await updateEntity('pregnant_documents', req.params.id, req.body);
    if (!updatedDoc) return res.status(404).send('Documento não encontrado.');
    return res.json(updatedDoc);
  } catch (err) {
    console.error('Erro em updateDocument:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  updateDocument,
};
