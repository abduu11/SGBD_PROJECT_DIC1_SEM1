const express = require("express");
const upload = require("../middleware/upload");
const { saveExam, getExams, deleteExam, getAllExams } = require("../controllers/examController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), saveExam);
router.get("/", authMiddleware, getExams);
router.get("/all",authMiddleware, getAllExams);
router.delete("/:id", authMiddleware, deleteExam); 


module.exports = router;