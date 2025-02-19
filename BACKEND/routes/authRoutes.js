const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const { nom, prenom, email, mot_de_passe, role, date_inscription} = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) return res.status(400).json({ message: "Email deja utilise"});

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const newUser = await User.create({ nom, prenom, email, mot_de_passe: hashedPassword, role, date_inscription});

        res.status(200).json({ message: "Utilisateur cree avec succes !"});
    } catch (error) {
        res.status(500).json({ message: "Erreur provenant du serveur ",error});
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, mot_de_passe } = req.body;

        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(400).json({ message: "Utilisateur non trouve!"});

        const correspond = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if(!correspond) return res.status(400).json({ message: "Mot de passe incorrect"});

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "3h",
        });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Erreur survenu au sein du serveur ", error});
    }
});

module.exports = router;