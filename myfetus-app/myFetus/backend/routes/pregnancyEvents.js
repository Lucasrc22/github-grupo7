const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/pregnancyEventsController');

router.post('/', eventsController.createEvent);
router.get('/', eventsController.getEvents);
router.put('/:id', eventsController.updatePregnancyEvent)

module.exports = router;