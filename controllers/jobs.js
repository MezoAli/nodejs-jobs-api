const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const userId = req.user.id;
  const allJobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(200).json({ success: true, count: allJobs.length, jobs: allJobs });
};

const getSingleJob = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id).populate("createdBy");
  if (!job) {
    throw new NotFoundError("no job with that id");
  }
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
  res.status(201).json({ success: true, msg: "Job added successfully", job });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  addJob,
};
