const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) return res.status(404).send("Username already exists");
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    const result = await user.save();
    const token = user.generateJWT();
    return res.send({
      token: token,
      data: {
        username: result.username,
      },
    });
  } catch (err) {
    const errMsg = [];
    for (field in err.errors) {
      errMsg.push(err.errors[field].message);
    }
    return res.status(400).send(errMsg);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("Not Found");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Wrong Password");

    const token = user.generateJWT();
    return res.send({ token: token });
  } catch (error) {
    return res.status(400).send("Error");
  }
};

router.route("/").post(signup);
router.route("/login").post(login);

module.exports = router;
