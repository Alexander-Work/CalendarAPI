const Event = require('../models/Event');
const nodemailer = require('nodemailer');

// event to save event and send out an email when required
exports.createEvent = async (req, res) => {
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
exports.updateEvent = async (req, res) => {
  // Implement event update logic
};

// Delete event
exports.deleteEvent = async (req, res) => {
  // Implement event deletion logic
};

// View events
exports.viewEvents = async (req, res) => {
  // Implement event retrieval logic
};

// Function to send email reminders
const sendEmailReminders = (event) => {
  const transporter = nodemailer.createTransport({
    // Set up your email service configuration
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
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
