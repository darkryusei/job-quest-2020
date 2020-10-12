const jokeService = require("../service/jokeService");
const authService = require("../service/authService");

const jokeController = {
  getAllJoke: async (req, res) => {
    try {
      const joke_all = await jokeService.getAll();
      res.status(200).send(joke_all);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addNewJoke: async (req, res) => {
    try {
      let data_auth = authService.verifyToken(req.token);
      req.body.user_id = data_auth.data.user_id;
      const new_joke = await jokeService.addJoke(req.body);
      res.status(200).send(new_joke);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getJokeById: async (req, res) => {
    try {
      const joke = await jokeService.getById(req.params.id);
      res.status(200).send(joke);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteJokeById: async (req, res) => {
    try {
      let data_auth = authService.verifyToken(req.token);
      const joke_deleted = await jokeService.deleteJoke(
        data_auth.data.user_id,
        req.params.id
      );
      joke_deleted
        ? res.status(200).send("Delete Joke Complete")
        : res.status(200).send("Not found Joke OR You are not own this Joke!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  likeJoke: async (req, res) => {
    try {
      const joke_data = await jokeService.getById(req.params.id);
      joke_data === null
        ? res.status(200).send("Not found Joke")
        : !(await jokeService.likeOrDislikeJoke(
            req.params.id,
            joke_data,
            "like"
          ))
        ? res.status(200).send("Can't liked this Joke!")
        : res.status(200).send("You liked this Joke!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  dislikeJoke: async (req, res) => {
    try {
      const joke_data = await jokeService.getById(req.params.id);
      joke_data === null
        ? res.status(200).send("Not found Joke")
        : !(await jokeService.likeOrDislikeJoke(
            req.params.id,
            joke_data,
            "dislike"
          ))
        ? res.status(200).send("Can't disliked this Joke!")
        : res.status(200).send("You disliked this Joke!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

module.exports = jokeController;
