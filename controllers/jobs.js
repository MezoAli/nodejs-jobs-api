const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const userId = req.user.id;
  const allJobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(200).json({ success: true, count: allJobs.length, jobs: allJobs });
};

const getSingleJob = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findOne({
    _id: id,
    createdBy: req.user.id,
  }).populate("createdBy");
  if (!job) {
    throw new NotFoundError("no job with that id");
  }
  res.status(200).json({ success: true, job });
};

const updateJob = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const userId = req.user.id;
  const job = await Job.findOneAndUpdate(
    {
      _id: id,
      createdBy: userId,
    },
    data,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError("no job with that id");
  }
  res.status(201).json({ success: true, job, msg: "job updated Successfully" });
};

const deleteJob = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const job = await Job.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError("no job with that id");
  }
  res.status(201).json({ success: true, msg: "Job deleted successfully" });
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
