const Examen = require("../models/Examen");

const saveExam = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier envoye" });
        }

        const { titre, description } = req.body;
        const id_enseignant = req.user.id || req.body.id_enseignant;
        const date_creation = new Date();

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

const getExams = async (req, res) => {
    try {
        const id_enseignant = req.user.id;
        const exams = await Examen.findAll({ where: { id_enseignant } });
        res.json(exams);
    } catch (err) {
        console.error("Erreur lors de la récupération des examens:", err);
        res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
    }
}

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Examen.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: "Examen non trouvé" });
    }
    await exam.destroy();
    res.status(200).json({ message: "Examen supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'examen:", err);
    res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
  }
};

module.exports = { saveExam, getExams, deleteExam };