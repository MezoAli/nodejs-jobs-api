const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { BadRequestError } = require("../errors");
const register = async (req, res) => {
  const { password } = req.body;
  if (password.length < 6) {
    throw new BadRequestError("password should be atleast 6 characters");
  }
  const user = await User.create(req.body);
  res.status(200).json({ success: true, msg: "User Registered", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("email is not found, please register first");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequestError("wrong password");
  }
  const dataToBeSigned = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  // const tempUser =

  res
    .status(200)
    .json({ success: true, msg: "login user successfully", user, token });
};

module.exports = {
  login,
  register,
};
