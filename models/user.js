const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    birthdate: { type: String },
    location:{ type: String },
  },
  {
    // Esta propiedad servirá para guardar las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("users", UserSchema);
module.exports = User;