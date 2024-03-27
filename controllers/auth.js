const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../errors");
const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (password.length < 6) {
    throw new BadRequestError("password should be atleast 6 characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create(tempUser);
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
