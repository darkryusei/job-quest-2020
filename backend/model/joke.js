const mongoose = require("mongoose");

const jokeSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.ObjectId,
    },
    user_id: {
      type: String,
    },
    joke: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "joke",
  }
);

module.exports = Joke = mongoose.model("joke", jokeSchema);
