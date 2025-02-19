import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import photoEtudiant from "../assets/learn.jpg";
import photoEnseignant from "../assets/photo4.jpg";
import { Link } from "react-router-dom";
import "./register.css"

const Register = () => {
  const [role, setRole] = useState("etudiant");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
    } else {
      setError(""); 
      console.log({ prenom, nom, email, password, role }); 
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <Grid container sx={{ width: "100%", height: "100%" }}>
          {/* Section Image à droite */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                background: `url(${role === "etudiant" ? photoEtudiant : photoEnseignant})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                marginLeft: 1,
              }}
            />
          </Grid>

          {/* Section Formulaire à gauche */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{
                height: "100%",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white", 
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
                Inscription
              </Typography>

              {/* Sélecteur de rôle */}
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={(event, newRole) => setRole(newRole)}
                fullWidth
                sx={{ width: "100%", mb: 2 }}
              >
                <ToggleButton value="etudiant" sx={{ px: 4 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  Étudiant
                </ToggleButton>
                <ToggleButton value="enseignant" sx={{ px: 4 }}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  Enseignant
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Champ Prénom avec icône */}
              <TextField
                fullWidth
                label="Prénom"
                variant="outlined"
                margin="normal"
                onChange={(e) => setPrenom(e.target.value)}
                InputProps={{
                  startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />

              {/* Champ Nom avec icône */}
              <TextField
                fullWidth
                label="Nom"
                variant="outlined"
                margin="normal"
                onChange={(e) => setNom(e.target.value)}
                InputProps={{
                  startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />

              {/* Champ Email avec icône */}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />

              {/* Champ Mot de passe */}
              <TextField
                fullWidth
                label="Mot de passe"
                variant="outlined"
                type="password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <LockIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />

              {/* Confirmer le mot de passe */}
              <TextField
                fullWidth
                label="Confirmer mot de passe"
                variant="outlined"
                type="password"
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: <LockIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />

              {/* Message d'erreur */}
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={handleSubmit}
              >
                S'inscrire
              </Button>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Grid>
  );
};

export default Register;