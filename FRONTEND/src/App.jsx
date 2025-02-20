import React, { Children } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toaster } from 'react-hot-toast';
import EnseignantDash from "./pages/EnseignantDash";
import EtudiantDash from "./pages/EtudiantDash";
import UploadExamen from "./pages/UploadExamen";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if(!token) return <Navigate to="/login"/>
  if(role !== roleRequired) return <Navigate to="/login"/>

  return children;
}

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dash_enseignant" element={<EtudiantDash/>} />
          <Route path="/dash_etudiant" element={<EtudiantDash/>}/>
          <Route path="/upload-eaxmen" element={<PrivateRoute roleRequired="enseignant"><UploadExamen /></PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
