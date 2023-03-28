const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: {type: Number, requires:true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    location : { type: String, required: true },
    date :{ type: String, required: true },
    eventType: { type: String},
    capacity : { type: String},
    duration : { type: String},
    foto: { type: String}
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;