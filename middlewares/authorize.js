const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

module.exports = (req, res, next) => {
  const bearer = req.header("Authorization");
  if (!bearer) return res.status(400).send("Web token not available");
  const token = bearer.split(" ")[1].trim();
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};
