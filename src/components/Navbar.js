// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/crypto.png'; // Adjust the path based on your folder structure

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Avatar src={logo} style={{ width: 56, height: 56 }} />
                    <Button color="inherit" component={Link} to="/">Buy Crypto</Button>
                </Box>
                <Typography className="logo" variant="h6" style={{ flexGrow: 1 }}>
                </Typography>
                {user ? (
                    <>
                        <Avatar alt={user.username} style={{ marginRight: 16 }}>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
