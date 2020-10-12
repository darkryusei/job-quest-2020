const express = require("express");
const route = express.Router();

const jokeController = require("../controller/jokeController");
const userController = require("../controller/userController");

const authService = require("../service/authService");

//* GET ALL JOKE
route.get("/", jokeController.getAllJoke);
//* ADD NEW JOKE
route.post("/", authService.checkToken, jokeController.addNewJoke);
//* GET JOKE BY ID
route.get("/:id", jokeController.getJokeById);
//* DELETE JOKE
route.delete("/:id", authService.checkToken, jokeController.deleteJokeById);
//* LIKE JOKE
route.post("/:id/like", jokeController.likeJoke);
//* DISLIKE JOKE
route.post("/:id/dislike", jokeController.dislikeJoke);
//* LOGIN
route.post("/login", userController.logIn);
//* REGIS
route.post("/regis", userController.regisUser);

module.exports = route;
