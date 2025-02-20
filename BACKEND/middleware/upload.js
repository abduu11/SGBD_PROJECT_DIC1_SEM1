const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Crée le répertoire uploads/ si nécessaire, en utilisant un chemin absolu
const uploadDir = path.join(__dirname, '..', 'uploads'); // __dirname pointe vers le dossier courant (middleware)

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Crée le répertoire uploads/ si il n'existe pas
}

const stockage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);  // Utilise le répertoire uploads créé
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Donne un nom unique au fichier
    }
});

const upload = multer({
    storage: stockage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Seul les fichier pdf sont autorises"), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
