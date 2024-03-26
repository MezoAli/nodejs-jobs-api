const getAllJobs = async (req, res) => {
  res.status(200).json({ success: true, msg: "get all jobs" });
};
const getSingleJob = async (req, res) => {
  res.status(200).json({ success: true, msg: "get single job" });
};
const updateJob = async (req, res) => {
  res.status(201).json({ success: true, msg: "update job" });
};
const deleteJob = async (req, res) => {
  res.status(200).json({ success: true, msg: "delete job" });
};
const addJob = async (req, res) => {
  res.status(201).json({ success: true, msg: "add job" });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  addJob,
};
