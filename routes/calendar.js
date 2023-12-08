const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar.js');
// all functions were moved to a controller to make the api endpoints easier to read
// create
router.post('/createEvent', calendarController.createEvent);

// update
router.put('/updateEvent/:eventId', calendarController.updateEvent);

// delete
router.delete('/deleteEvent/:eventId', calendarController.deleteEvent);

// view calendar
router.get('/calendar', calendarController.viewEvents);

module.exports = router;
