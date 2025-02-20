const express = require("express");
const upload = require("../middleware/upload");
const { saveExam } = require("../controllers/examController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), saveExam);

module.exports = router;