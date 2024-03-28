const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  res.status(200).json({ success: true, msg: "get all jobs" });
};
const getSingleJob = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id).populate("createdBy");
  res.status(200).json({ success: true, job });
};
const updateJob = async (req, res) => {
  res.status(201).json({ success: true, msg: "update job" });
};
const deleteJob = async (req, res) => {
  res.status(200).json({ success: true, msg: "delete job" });
};
const addJob = async (req, res) => {
  const userId = req.user.id;
  const data = { ...req.body, createdBy: userId };
  const job = await Job.create(data);
  res.status(201).json({ success: true, msg: "add job", job });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  addJob,
};
