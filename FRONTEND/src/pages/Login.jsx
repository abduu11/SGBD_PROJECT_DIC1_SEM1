import React, { useState } from "react";
import { TextField, Button, Card, Grid, Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import photoEtudiant from "../assets/photo1.jpeg";
import photoEnseignant from "../assets/photo4.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {

  const [role, setRole] = useState("etudiant");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setmot_de_passe] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Données envoyées :", { email, mot_de_passe, role });

    try{
      if (!email || !mot_de_passe) {
        setError("Veuillez remplir tous les champs.");
      } else {
        setError(""); 
        console.log({ email, mot_de_passe, role }); 

        const res = await axios.post("http://localhost:5000/api/auth/login", { email, mot_de_passe, role});
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_utilisateur", res.data.id_utilisateur);
        localStorage.setItem("role", res.data.role);

        if (res.data.role == "enseignant") {
          navigate("/dash_enseignant");
        } else{
          navigate("/dash_etudiant");
        }
    }
    }catch(err){
      setError("Identifiants incorrects");
    }
  }

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card sx={{ display: "flex", width: 800, borderRadius: 3, boxShadow: 5 }}>
          {/* Section Image */}
          <Box
            sx={{
              width: "40%",
              background: `url(${role === "etudiant" ? photoEtudiant : photoEnseignant})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}
          />

          {/* Section Formulaire */}
          <Box
            sx={{
              width: "60%",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
              Connexion
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

            {/* Champ Email */}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
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
              onChange={(e) => setmot_de_passe(e.target.value)}
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
              onClick={handleLogin}
            >
              Se connecter
            </Button>
            <p className="link">Je ne me suis pas encore<Link to="/register"> inscrit.</Link> </p>
          </Box>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default Login;
