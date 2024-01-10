const express = require("express");
const morgan = require("morgan");
const studentRouter = require("./routes/studentRouter");
const authRouter = require("./routes/authRouter");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/api/students", studentRouter);
app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.type("html").send("index.html");
});

module.exports = app;
