import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardActions, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';
import UploadExamen from './UploadExamen';
import axios from 'axios';

const EnseignantDash = () => {
  const [exams, setExams] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const fetchExams = () => {
    const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification depuis le stockage local
    axios.get('http://localhost:5000/api/exams', {
      headers: {
        Authorization: `Bearer ${token}` // Ajoutez le jeton d'authentification aux en-têtes de la requête
      }
    })
      .then(response => {
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
          if (Array.isArray(response.data)) {
            // Trier les examens par date de création (du plus récent au plus ancien)
            const sortedExams = response.data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
            setExams(sortedExams);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } else {
          console.error("Unexpected content type:", response.headers['content-type']);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the exams!", error);
      });
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification depuis le stockage local
    axios.delete(`http://localhost:5000/api/exams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Ajoutez le jeton d'authentification aux en-têtes de la requête
      }
    })
      .then(response => {
        setExams(exams.filter(exam => exam.id !== id));
        setShowConfirm(false);
        setExamToDelete(null);
      })
      .catch(error => {
        console.error("There was an error deleting the exam!", error);
      });
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleClose = () => {
    setShowAll(false);
  };

  const handleView = (exam) => {
    setSelectedExam(exam);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedExam(null);
  };

  const handleOpenConfirm = (exam) => {
    setExamToDelete(exam);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setExamToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (examToDelete) {
      handleDelete(examToDelete.id);
    }
  };

  return (
    <div>
      <Navbar />
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Tableau de Bord Enseignant
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <UploadExamen onUploadSuccess={fetchExams} />
            </Paper>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}> {/* Ajoutez la marge ici */}
            <Typography variant="h5" gutterBottom>
              Examens Téléversés
            </Typography>
            <Grid container spacing={3}>
              {exams.slice(0, 6).map((exam) => (
                <Grid item xs={12} sm={6} md={4} key={exam.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {exam.titre}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {exam.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleView(exam)}>
                        Voir
                      </Button>
                      <Button size="small" color="secondary" onClick={() => handleOpenConfirm(exam)}>
                        Supprimer
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {exams.length > 6 && (
              <Button variant="contained" color="primary" onClick={handleShowAll} style={{ marginTop: '20px', marginBottom: '20px'}}>
                Voir tous les examens
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
      <Dialog open={showAll} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Tous les Examens</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {exams.map((exam) => (
              <Grid item xs={12} sm={6} md={4} key={exam.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {exam.titre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {exam.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleView(exam)}>
                      Voir
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleOpenConfirm(exam)}>
                      Supprimer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
      {selectedExam && (
        <Dialog open={showDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
          <DialogTitle>Détails de l'Examen</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedExam.titre}</Typography>
            <Typography variant="body2" color="textSecondary">{selectedExam.description}</Typography>
            {/* Ajoutez d'autres détails de l'examen ici */}
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={showConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cet examen ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EnseignantDash;
