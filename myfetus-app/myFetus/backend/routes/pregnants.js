const express = require('express');
const router = express.Router();
const pregnantController = require('../controllers/pregnantController');

router.post('/', pregnantController.createPregnant);
router.get('/', pregnantController.getPregnants);
router.put('/:id', pregnantController.updatePregnant)

module.exports = router;