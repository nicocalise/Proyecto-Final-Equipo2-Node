const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: {type: Number, requires:true},
    name: { type: String },
    description: { type: String },
    location : { type: String },
    date :{ type: String },
    eventType: { type: String},
    capacity : { type: Number, required:true},
    duration : { type: String},
    foto: { type: String}
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;