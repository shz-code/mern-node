const express = require("express");
const router = express.Router();
const Student = require("../models/students");
const authorize = require("../middlewares/authorize");

const studentList = async (req, res) => {
  try {
    const data = await Student.find().select({ name: 1, dob: 1 });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const studentDetails = async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);
    if (!data) return res.status(404).send("Not Found");
    res.send(data);
  } catch (err) {
    return res.status(404).send("Not Found");
  }
};

const newStudent = async (req, res) => {
  const body = req.body;
  try {
    const student = await Student(body);
    const data = await student.save();
    return res.send(data);
  } catch (err) {
    const errMsg = [];
    for (field in err.errors) {
      errMsg.push(err.errors[field].message);
    }
    return res.status(400).send(errMsg);
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).send("Not Found");
    res.send(data);
  } catch (err) {
    return res.status(404).send("Not Found");
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await Student.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).send("Not Found");
    res.send("Deleted");
  } catch (err) {
    return res.status(404).send("Not Found");
  }
};

router.route("/").get(authorize, studentList).post(newStudent);
router
  .route("/:id")
  .get(studentDetails)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
