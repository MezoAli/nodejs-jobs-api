const { CustomAPIError } = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    message: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value for ${Object.values(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.message = `no job with that id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
