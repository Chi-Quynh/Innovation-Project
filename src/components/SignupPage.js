import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import SignupImg from "../images/2363386.jpg"; // Import image from the images folder
import Footer from "./Footer"

const Signup = () => {
  const { signup } = useAuth(); // Using the signup function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [localError, setLocalError] = useState(""); // Local error state
  const [successMessage, setSuccessMessage] = useState(""); // New success message state
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLocalError("");
    setSuccessMessage(""); // Reset success message

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
      <Box className="account-container">
        {/* Image Box */}
        <Box className="account-img">
          <img
            src={SignupImg}
            alt="BitCoinLoginPage"
            style={{
              width: "100%", // Makes the image take up 100% of the box's width
              height: "100%", // Adjust height to 100% of the box
              objectFit: "cover", // Covers the entire box, may cut off parts of the image
              objectPosition: "left", // Focus on the right part of the image
            }}
          />
        </Box>

        {/* Account Signup Form Box */}
        <Box className="account-sign">
          <Typography variant="h4" gutterBottom>
            Let's get started
          </Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Re-type Password"
            type="password"
            fullWidth
            size="small"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            helperText="Password must include at least one uppercase letter."
            required
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              sx={{ ml: 1 }}
            >
              Sign up
            </MuiLink>
          </Typography>
          {localError && <Alert severity="error">{localError}</Alert>}{" "}
          {/* Display local error messages */}
          {successMessage && (
            <Alert severity="success">{successMessage}</Alert>
          )}{" "}
          {/* Display success message */}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Signup;


