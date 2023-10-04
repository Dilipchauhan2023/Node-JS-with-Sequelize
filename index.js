const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const db = require("./config/database");
const customRouter = require("./router");

const app = express();
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__basedir, "public")));
app.use("/uploads", express.static(path.join(__basedir, "uploads")));

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/v1", customRouter);

// database connection check
db.sync()
  .then(console.log("connected to database !!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
