import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/Navbar';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/'); // Redirect to homepage on successful login
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <>
            <NavBar />
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="80vh"
                sx={{ backgroundColor: '#f5f5f5' }} // Light background color
            >
                <Typography variant="h4" gutterBottom>Login to Your Account</Typography>
                <Box component="form" onSubmit={handleLogin} width="300px" display="flex" flexDirection="column">
                    <Typography align="left" gutterBottom>Gmail</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    
                    <Typography align="left" gutterBottom>Password</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>
                
                <Typography sx={{ mt: 2 }}>
                    Don't have an account? 
                    <MuiLink component={Link} to="/signup" underline="hover" sx={{ ml: 1 }}>
                        Sign up
                    </MuiLink>
                </Typography>
            </Box>
        </>
    );
};

export default LoginPage;
