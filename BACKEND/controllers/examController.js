const Examen = require("../models/Examen");

const saveExam = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier envoye" });
        }

        const { titre, description } = req.body;
        const id_enseignant = req.user.id || req.body.id_enseignant;
        const date_creation = new Date();

        console.log(id_enseignant);

        console.log("Creating new exam with data:", {
            titre,
            filePath: req.file.path,
            id_enseignant,
            description,
            date_creation,
        });

        const newExamen = await Examen.create({
            titre,
            filePath: req.file.path,
            id_enseignant, 
            description,
            date_creation,
        });

        res.status(200).json({ message: "Sujet ajoute avec succes", examen: newExamen });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement de l'examen:", err);
        res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
    }
}

module.exports = { saveExam };