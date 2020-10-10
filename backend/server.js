const express = require("express");
const app = express();
const config = require("./util/config");
const api = require("./route/route");
const mongoose = require("./util/database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  next();
});

app.use(api);
app.listen(config.port, () => {
  console.log(`Server start on port ${config.port}`);
});
