const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: [50, "Company name can not exceed 50 characters"],
      minlength: [3, "Company name can not be less than 3 characters"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: [100, "Company name can not exceed 100 characters"],
      minlength: [5, "Company name can not be less than 5 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "pending", "decline"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
