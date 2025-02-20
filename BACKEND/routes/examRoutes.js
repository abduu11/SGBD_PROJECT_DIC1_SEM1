const express = require("express");
const upload = require("../middleware/upload");
const { saveExam, getExams, deleteExam } = require("../controllers/examController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), saveExam);
router.get("/", authMiddleware, getExams);
router.delete("/:id", authMiddleware, deleteExam); // Assurez-vous que cette ligne est présente

module.exports = router;