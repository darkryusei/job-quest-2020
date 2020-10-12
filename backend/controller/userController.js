const userService = require("../service/userService");
const authService = require("../service/authService");

const userController = {
  regisUser: async (req, res) => {
    try {
      req.body.password = await authService.bcryptPassword(req.body.password);
      const new_user = await userService.regisUser(req.body);
      res.status(200).send(new_user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  logIn: async (req, res) => {
    try {
      const data_user = await userService.findByUserId(req.body.user_id);
      const check_password = await authService.compareBcrypt(
        req.body.password,
        data_user.password
      );
      if (check_password) {
        const token = authService.signToken(data_user);
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
  },
};

module.exports = userController;
