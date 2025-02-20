import { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography, Box, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";

const UploadExamen = ({ onUploadSuccess }) => {
  const [titre, setTitre] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!titre || !file) {
      setError("Veuillez remplir tous les champs et sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("file", file);
    formData.append("description", description);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const id_enseignant = localStorage.getItem("id_utilisateur");
      if (!id_enseignant) {
        throw new Error("Identifiant de l'enseignant non trouvé");
      }

      formData.append("id_enseignant", id_enseignant);
      const res = await axios.post("http://localhost:5000/api/exams/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message);
      setTitre("");
      setDescription("");
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      console.error("Erreur lors de l'upload:", err); 
      setError(err.response?.data?.message || "Erreur lors de l'upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      bgcolor="#f5f5f5"
    >
      <Card sx={{ padding: 4, width: 400, borderRadius: 3, boxShadow: 5, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Déposer un sujet
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            label="Titre"
            variant="outlined"
            fullWidth
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor: "#1976D2", color: "white", "&:hover": { bgcolor: "#1565C0" } }}
          >
            Sélectionner un fichier PDF
            <input type="file" hidden accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ color: "#1976D2", fontWeight: "bold" }}>
              {file.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#1976D2", "&:hover": { bgcolor: "#1565C0" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Uploader"}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default UploadExamen;
