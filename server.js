const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV == "development") {
  mongoose
    .connect(process.env.LOCAL_DB_URL)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => console.log(err));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
