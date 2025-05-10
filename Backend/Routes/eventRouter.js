const express = require("express");
const eventController = require("../Controllers/eventController");

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvent);
router.put('/:id' , eventController.updateEvents);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;