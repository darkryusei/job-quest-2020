const User = require("../model/user");

const userService = {
  regisUser: (data) => {
    let obj = new User(data);
    return obj.save();
  },
  findByUserId: (user_id) => {
    return User.findOne({ user_id: user_id });
  },
};

module.exports = userService;
