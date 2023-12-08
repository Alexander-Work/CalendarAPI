const Event = require('../models/Event');
const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../public/config/globals');

// event to save event and send out an email when required
exports.createEvent = async (req, res, next) => {
  try {
    const { email, date, additionalRecipients } = req.body;

    // mongodb save
    const event = await Event.create({
      email,
      date,
      additionalRecipients,
    });

    // reminders
    sendEmailReminders(event);

    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Update event
exports.updateEvent = async (req, res, next) => {
    console.log(req.params.eventId);
  // Validate required fields
  if (!req.body.email) {
    res.status(400).json({ 'ValidationError': 'Name is a required field' });
}
else if (!req.body.date) {
    res.status(400).json({ 'ValidationError': 'Course is a required field' });
}
else {
    Event.findOneAndUpdate(
        
        { _id: req.params.eventId },
        {
          email: req.body.email,
          date: req.body.date,
          additionalRecipients: req.body.additionalRecipients
        },
        { new: true } // Return the modified document
      )
        .exec()
        .then(updatedEvent => {
          if (!updatedEvent) {
            // Handle the case where the document with the given ID is not found
            return res.status(404).json({ 'ErrorMessage': 'Event not found' });
          }
          res.status(200).json(updatedEvent);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ 'ErrorMessage': 'Server threw an exception' });
        });
      
}
};

// Delete event
exports.deleteEvent = async (req, res, next) => {
    //parse for id then delete the event with the id that matches
    Event.deleteOne({ _id: req.params.eventId })
  .exec()
  .then(() => {
    res.status(200).json({ success: true });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ ErrorMessage: 'Server threw an exception' });
  });

};

// View events
exports.viewEvents = async (req, res, next) => {
      // create query object and add email and date to the search
      let query = {};
      if (req.query.email)
      {
          query.email = req.query.email;
      }
      if (req.query.date)
      {
          console.log(req.query.date);
          query.date = req.query.date;
      }
      // find and send back the json
      Event.find(query)
      .exec()
      .then((events) => {
        res.status(200).json(events);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ 'ErrorMessage': 'Server threw an exception' });
      });
};

// Function to send email reminders
const sendEmailReminders = (event) => {
    //email service set up
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.emailPASSWORD,
    },
  });

  const mailOptions = {
    from: config.email,
    to: [event.email, ...event.additionalRecipients],
    subject: 'Event Reminder',
    text: `Reminder: Your event is scheduled for ${event.date}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
