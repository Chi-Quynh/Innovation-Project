import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/Navbar';  // Ensure you're using the correct NavBar path

const LoginPage = () => {
    const [email, setEmail] = useState('');  // Use email instead of username
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();  // Access the login and error state from AuthContext
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(email, password);  // Try logging in with email and password

        if (success) {
            navigate('/');  // Redirect to homepage on successful login
        } else {
            alert(error || 'Invalid credentials');  // Show the error from context or a default message
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
                sx={{ backgroundColor: '#f5f5f5' }} 
            >
                <Typography variant="h4" gutterBottom>Login to Your Account</Typography>
                <Box component="form" onSubmit={handleLogin} width="300px" display="flex" flexDirection="column">
                    {/* Email input instead of username */}
                    <Typography align="left" gutterBottom>Email</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                {/* Conditional error message based on the AuthContext */}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

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
