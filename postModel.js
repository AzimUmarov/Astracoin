const mongoose = require("mongoose");
const { Schema, model } = mongoose
const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  coin: {
    type: Number,
    default: 0
  }
});

module.exports = model('User', schema);