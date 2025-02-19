import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ff7f00" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo ou Nom de l'Application */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Mon Application
                </Typography>

                {/* Bouton Déconnexion */}
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        backgroundColor: "white",
                        color: "#ff7f00",
                        "&:hover": { backgroundColor: "#ffb366" },
                    }}
                >
                    Déconnexion
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
