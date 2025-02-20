const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis l'en-tête de la requête
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Extraire le token du format "Bearer <token>"
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Ajouter l'utilisateur vérifié à la requête
    next(); // Continuer vers la prochaine fonction ou route
  } catch (err) {
    res.status(400).json({ message: "Le token est invalide." });
  }
};

module.exports = authMiddleware;
