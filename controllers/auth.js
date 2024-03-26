const register = async (req, res) => {
  res.status(200).json({ success: true, msg: "register user" });
};
const login = async (req, res) => {
  res.status(200).json({ success: true, msg: "login user" });
};

module.exports = {
  login,
  register,
};
