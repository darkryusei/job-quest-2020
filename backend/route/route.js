//TODO =========================================
//! ย้ายทั้งหมดเป็น controler และ service ได้แล้ว!!!!
//TODO =========================================

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const route = express.Router();

const Joke = require("../model/joke_model");
const User = require("../model/user_model");

//* GET ALL JOKE
route.get("/", checkToken, async (req, res) => {
  try {
    const joke_all = await Joke.find();
    res.status(200).send(joke_all);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* ADD NEW JOKE
//TODO ควรจะต้องเอารหัส user ใส่เข้าไปใน joke ด้วย
route.post("/", checkToken, async (req, res) => {
  try {
    const obj = new Joke(req.body);
    const new_joke = await obj.save();
    res.status(200).send(new_joke);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* GET JOKE BY ID
route.get("/:id", checkToken, async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id);
    res.status(200).send(joke);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* DELETE JOKE
//TODO ควรจะต้องเอารหัส user มา check ไม่ให้ ลบ joke มั่ว
route.delete("/:id", checkToken, async (req, res) => {
  try {
    const joke_deleted = await Joke.findByIdAndDelete(req.params.id);
    if (joke_deleted) {
      res.status(200).send("Delete Joke Complete");
    } else {
      res.status(200).send("Not found Joke");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* LIKE JOKE
route.post("/:id/like", checkToken, async (req, res) => {
  try {
    const joke_data = await Joke.findById(req.params.id);
    joke_data === null
      ? res.status(200).send("Not found Joke")
      : !(await findAndUpdate(req.params.id, joke_data, "like"))
      ? res.status(200).send("Can't liked this Joke!")
      : res.status(200).send("You liked this Joke!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* DISLIKE JOKE
route.post("/:id/dislike", checkToken, async (req, res) => {
  try {
    const joke_data = await Joke.findById(req.params.id);
    joke_data === null
      ? res.status(200).send("Not found Joke")
      : !(await findAndUpdate(req.params.id, joke_data, "dislike"))
      ? res.status(200).send("Can't disliked this Joke!")
      : res.status(200).send("You disliked this Joke!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* LOGIN
route.post("/login", async (req, res) => {
  try {
    const data_user = await User.findOne({ user: req.body.user });
    const check_password = await bcrypt.compare(
      req.body.password,
      data_user.password
    );
    if (check_password) {
      const token = jwt.sign({ data_user }, "job-quest-2020", {
        expiresIn: "1h",
      });
      res.status(200).send({ status: check_password, token: token });
    } else {
      res
        .status(200)
        .send({ status: check_password, msg: "Password not correct" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//* REGIS
route.post("/regis", async (req, res) => {
  try {
    let bcrypt_password = await bcrypt.hash(req.body.password, 5);
    req.body.password = bcrypt_password;
    const obj = new User(req.body);
    const new_user = await obj.save();
    res.status(200).send(new_user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

function findAndUpdate(id, joke_data, type) {
  type === "like"
    ? ++joke_data.like
    : type === "dislike"
    ? ++joke_data.dislike
    : null;
  return Joke.findByIdAndUpdate(id, joke_data);
}

//TODO  ส่วนนี้จะต้องทำเพิ่มเติมในส่วนของ verify token
function checkToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(200).send("Not found Authorization!");
  } else {
    const token_arr = bearerHeader.split(" ");
    const token = token_arr[1];
    req.token = token;
    next();
  }
}

module.exports = route;
