const Joke = require("../model/joke");

const jokeService = {
  getAll: () => {
    return Joke.find();
  },
  addJoke: (data) => {
    let obj = new Joke(data);
    return obj.save();
  },
  getById: (id) => {
    return Joke.findById(id);
  },
  deleteJoke: (user_id, joke_id) => {
    return Joke.findOneAndDelete({
      user_id: { $eq: user_id },
      _id: { $eq: joke_id },
    });
  },
  likeOrDislikeJoke: (id, joke_data, type) => {
    type === "like"
      ? ++joke_data.like
      : type === "dislike"
      ? ++joke_data.dislike
      : null;
    return Joke.findByIdAndUpdate(id, joke_data);
  },
};

module.exports = jokeService;
