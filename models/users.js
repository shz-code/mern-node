const { Schema, model } = require("mongoose");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 5,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateJWT = function () {
  const token = JWT.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

module.exports = model("User", userSchema);
