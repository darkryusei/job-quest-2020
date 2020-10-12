const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const authService = {
  bcryptPassword: (password) => {
    return bcrypt.hash(password, 5);
  },
  compareBcrypt: (request_data, auth_data) => {
    return bcrypt.compare(request_data, auth_data);
  },
  signToken: (data) => {
    return jwt.sign({ data }, config.jwt_secret, { expiresIn: "1h" });
  },
  checkToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      res.status(200).send("Not found Authorization!");
    } else {
      const token_arr = bearerHeader.split(" ");
      const token = token_arr[1];
      req.token = token;
      next();
    }
  },
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt_secret);
  },
};

module.exports = authService;
