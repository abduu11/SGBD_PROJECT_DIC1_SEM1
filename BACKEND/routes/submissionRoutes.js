const express = require("express");
const upload = require("../middleware/upload");
const { submitExam } = require("../controllers/submissionController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/submit", authMiddleware, upload.single("file"), submitExam);

module.exports = router;