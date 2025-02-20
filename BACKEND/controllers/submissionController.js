const Submission = require('../models/Submission');

const submitExam = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier envoyé" });
        }

        const { id_etudiant, id_examen } = req.body;
        const date_soumission = new Date();

        console.log("Creating new submission with data:", {
            filePath: req.file.path,
            id_etudiant,
            id_examen,
            date_soumission,
        });

        const newSubmission = await Submission.create({
            fichier_pdf: req.file.path,
            id_etudiant,
            id_examen,
            date_soumission,
        });

        res.status(200).json({ message: "Sujet soumis avec succès", submission: newSubmission });
    }
    catch (err) {
        console.error("Erreur lors de la soumission du sujet:", err);
        res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
    }
}

module.exports = { submitExam };