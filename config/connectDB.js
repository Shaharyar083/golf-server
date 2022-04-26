const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb..."))
    .catch((err) => console.log(`error to connect mongodb: ${err}`));
}

module.exports = connectDB;
