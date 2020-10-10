const express = require("express");
const route = express.Router();

const Joke = require("../model/joke_model");

//* GET ALL JOKE
route.get("/", (req, res) => {
  Joke.find((err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});
//* ADD NEW JOKE
route.post("/", (req, res) => {
  const obj = new Joke(req.body);
  obj.save((err, data) => {
    err ? res.status(500).send(err) : res.status(200).send("Add Joke Complete");
  });
});
//* GET JOKE BY ID
route.get("/:id", (req, res) => {
  Joke.findById(req.params.id, (err, data) => {
    err ? res.status(500).send(err) : res.status(200).send(data);
  });
});
//* DELETE JOKE
route.delete("/:id", (req, res) => {
  Joke.findByIdAndDelete(req.params.id, (err, data) => {
    err
      ? res.status(500).send(err)
      : res.status(200).send("Delete Joke Complete");
  });
});
//* LIKE JOKE
route.post("/:id/like", async (req, res) => {
  const joke_data = await Joke.findById(req.params.id, (err, data) => {
    err ? res.status(500).send(err) : data;
  });
  ++joke_data.like;
  const joke_update = await Joke.findByIdAndUpdate(
    req.params.id,
    joke_data,
    (err, data) => {
      err
        ? res.status(500).send(err)
        : res.status(200).send("You like this Joke!");
    }
  );
});
//* DISLIKE JOKE
route.post("/:id/dislike", async (req, res) => {
  const joke_data = await Joke.findById(req.params.id, (err, data) => {
    err ? res.status(500).send(err) : data;
  });
  const joke_data_2 = await Joke.findById(req.params.id);

  const joke_data_3 = Joke.findById(req.params.id, (err, data) => {
    err ? res.status(500).send(err) : data;
  }).then((data) => data);

  console.log("joke3", joke_data_3);
  console.log("joke2", joke_data_2);
  console.log(joke_data);
  ++joke_data.dislike;
  const joke_update = await Joke.findByIdAndUpdate(
    req.params.id,
    joke_data,
    (err, data) => {
      err
        ? res.status(500).send(err)
        : res.status(200).send("You disike this Joke!");
    }
  );
});

module.exports = route;
