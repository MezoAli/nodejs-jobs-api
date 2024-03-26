const User = require("../models/User");
const { BadRequestError } = require("../errors");
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({ success: true, msg: "User Registered", user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("email is not found, please register first");
  }
  if (user.password !== password) {
    throw new BadRequestError("wrong password");
  }
  res.status(200).json({ success: true, msg: "login user successfully", user });
};

module.exports = {
  login,
  register,
};
