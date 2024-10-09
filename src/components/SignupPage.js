import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const { signup } = useAuth(); // Using the signup function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [localError, setLocalError] = useState(''); // Local error state
  const [successMessage, setSuccessMessage] = useState(''); // New success message state
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLocalError('');
    setSuccessMessage(''); // Reset success message

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address!");
      return;
    }

    // Check if passwords match
    if (password !== retypePassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    // Check for at least one uppercase letter
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      setLocalError("Password must contain at least one uppercase letter!");
      return;
    }

    // Proceed with signup
    const success = signup(email, password); // Removed retypePassword from the signup call
    if (!success) {
      setLocalError("Signup failed, the account may already exist!");
    } else {
      setSuccessMessage("Signup successful! You can now log in."); // Show success message
      setTimeout(() => {
        navigate("/login"); // Redirect to login after successful signup
      }, 2000); // Delay for 2 seconds to show the message
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
        <Typography variant="h5">Sign Up</Typography>
        {localError && <Alert severity="error">{localError}</Alert>} {/* Display local error messages */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>} {/* Display success message */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Re-type Password"
          type="password"
          fullWidth
          margin="normal"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          helperText="Password must include at least one uppercase letter."
          required
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Signup;
