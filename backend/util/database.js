const mongoose = require("mongoose");
const config = require("./config");

const mongo_uri = config.url_DB;

mongoose.Promise = global.Promise;

mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  (error) => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);