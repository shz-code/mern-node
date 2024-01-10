const { Schema, model } = require("mongoose");

const Student = model("Student", {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate: {
      validator: (value) => value > 18,
      message: "Must be 18 years old",
    },
  },
  passed: Boolean,
});

module.exports = Student;
