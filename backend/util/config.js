const dotevn = require("dotenv");
dotevn.config();

config = {
  port: process.env.PORT || 4000,
  server: process.env.SERVER || "Dev Server",
  url_DB: process.env.URL_DB || "mongodb://localhost:27017/takemetour",
};

module.exports = config;
