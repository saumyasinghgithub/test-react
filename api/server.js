const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
const path = require("path");

const app = express();

const cfg = require("dotenv");
cfg.config();

const middlewares = [
  express.static(path.join(__dirname, "public")),
  express.urlencoded({ limit: "250mb", extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: "250mb" }),
  bodyParser.urlencoded({
    limit: "250mb",
    extended: true,
    parameterLimit: 50000,
  }),
  fileUpload({
    createParentPath: true,
  }),
  cookieParser(),
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
];
app.use(middlewares);

app.use("/user", require("./routes/user")());

app.use("/", require("./routes/api")());

const port = _.get(process.env, "PORT", 3000);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});