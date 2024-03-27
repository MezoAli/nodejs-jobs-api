const User = require("../models/User");

const { BadRequestError, UnauthenticatedError } = require("../errors");
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
  if (!email || !password) {
    throw new BadRequestError("invalid credentils");
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("email is not found, please register first");
  }
  const result = await user.comparePassword(password);
  if (!result) {
    throw new UnauthenticatedError("wrong password");
  }

  const token = user.generateToken();

  res
    .status(200)
    .json({ success: true, msg: "login user successfully", user, token });
};

module.exports = {
  login,
  register,
};
