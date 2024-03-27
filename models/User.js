const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [5, "name should be atleast 5 characters"],
      maxlength: [30, "name should be less than 30 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a valid email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "password should be atleast 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});

UserSchema.methods.generateToken = function () {
  const dataToBeSigned = {
    name: this.name,
    email: this.email,
    id: this._id,
  };
  const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("User", UserSchema);
