var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const TestBbHandler = require("./database/TestDbHandler");
const { connectToDB } = require("./database/MongoDbHandler");
const indexRouter = require("./routes/index");
const studentRouter = require("./routes/student");
const subjectRouter = require("./routes/subject");

if (process.env.NODE_ENV === "test") {
  TestBbHandler.connect();
} else {
  connectToDB();
}

var app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/students", studentRouter);
app.use("/subjects", subjectRouter);

module.exports = app;
