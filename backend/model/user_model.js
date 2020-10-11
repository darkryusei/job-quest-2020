const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.ObjectId,
    },
    user: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "user",
  }
);

module.exports = User = mongoose.model("user", userSchema);
