const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true }, 
      password:{ type: String, required: true },
      birthdate: { type: String, required: true },
      location: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;