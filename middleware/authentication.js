const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  if (!authorization.startsWith("bearer") || !token) {
    throw new UnauthenticatedError("invalid token");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid token");
  }
};

module.exports = authenticationMiddleware;
