const express = require('express');
const router = express.Router();
const pregnancyController = require('../controllers/pregnancyController');

router.post('/', pregnancyController.createPregnancy);
router.get('/', pregnancyController.getPregnancies);
router.put('/:id', pregnancyController.updatePregnancy)
router.put('/:id', pregnancyController.updateDPP)

module.exports = router;