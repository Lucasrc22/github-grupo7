const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadDocument, getDocuments, getDocumentById, deleteDocument, updateDocument } = require('../controllers/documentsController');

const upload = multer({ dest: 'uploads/' }); // pasta para salvar arquivos temporariamente

router.post('/documents', upload.single('document'), uploadDocument);
router.get('/documents', getDocuments); // lista por pregnant_id (query param)
router.get('/documents/:id', getDocumentById); // busca o doc por id
router.delete('/documents/:id', deleteDocument);
router.put('/documents/:id', updateDocument);

module.exports = router;