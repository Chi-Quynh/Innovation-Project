import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/Navbar';
import Footer from "./Footer";

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        signup(username, password);
        navigate('/login'); // Redirect to login after signup
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
                <Typography variant="h4" gutterBottom>Let's get started</Typography>
                <Box component="form" onSubmit={handleSignup} width="300px" display="flex" flexDirection="column">
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
                        Sign up
                    </Button>
                </Box>
                
                <Typography sx={{ mt: 2 }}>
                    Already have an account? 
                    <MuiLink component={Link} to="/login" underline="hover" sx={{ ml: 1 }}>
                        Sign in
                    </MuiLink>
                </Typography>
            </Box>
            <Footer/>
        </>
    );
};

export default SignupPage;
