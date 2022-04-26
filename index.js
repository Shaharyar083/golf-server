const express = require("express");

const bodyparser = require("body-parser"); // WHY USE BODY-PARSER
require("dotenv").config(); // WHY REQUIRE dotenv
const cors = require("cors");

const connectDB = require("./config/connectDB");

// require all routes
const auth = require("./routes/auth_Route");
const product = require("./routes/product_Route");

connectDB();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/product", product);

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});

// ------------------------------------------------- WHY REQUIRE dotenv ---------------------------------------------------------
// for using environment variables you must require and config dotenv
// ------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------- WHY USE BODY-PARSER ---------------------------------------------------------
// To handle HTTP POST requests in Express.js version 4 and above, you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
// The middleware was a part of Express.js earlier but now you have to install it separately.
// This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
// ------------------------------------------------------------------------------------------------------------------------------
