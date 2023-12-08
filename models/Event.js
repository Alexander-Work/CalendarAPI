// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  email:{   type: String,
            required: true 
        },
  date: {    type: Date,
            required: true
        },
  additionalRecipients: {   type: [String],
                            default: [] 
                        },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
