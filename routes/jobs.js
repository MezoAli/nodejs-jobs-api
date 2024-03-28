const express = require("express");
const router = express.Router();
const {
  addJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} = require("../controllers/jobs");

router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.post("/", addJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
