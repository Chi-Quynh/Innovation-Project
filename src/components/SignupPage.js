import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "../script/auth"; // Custom hook for Supabase authentication logic
import NavBar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import SignupImg from "../images/2363386.jpg"; // Import image from the images folder
import Footer from "./Footer";

const Signup = () => {
  const { signup } = useAuth(); // Using the signup function from AuthContext (Supabase authentication)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [localError, setLocalError] = useState(""); // Local error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLocalError("");
    setSuccessMessage(""); // Reset success message
    setLoading(true); // Start loading

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address!");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== retypePassword) {
      setLocalError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Check for at least one uppercase letter in the password
    const passwordComplexityCheck =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordComplexityCheck.test(password)) {
      setLocalError(
        "Password must be at least 8 characters, with an uppercase letter, a number, and a special symbol."
      );
      setLoading(false);
      return;
    }

    try {
      // Proceed with signup using Supabase
      const { error } = await signup(email, password); // Send email and password to Supabase

      if (error) {
        // Handle specific Supabase error codes
        if (error.message.includes("duplicate")) {
          setLocalError(
            "This email is already registered. Please use a different email."
          );
        } else {
          setLocalError(error.message); // Display other errors from Supabase
        }
      } else {
        setSuccessMessage("Signup successful! Redirecting to login..."); // Show success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful signup
        }, 2000); // Delay for 2 seconds to show the message
      }
    } catch (error) {
      setLocalError("Signup failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading after request completes
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
            alt="Signup illustration"
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
            helperText="Must be at least 8 characters, with an uppercase letter, a number, and a symbol."
            required
          />
          <TextField
            label="Re-type Password"
            type="password"
            fullWidth
            size="small"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Already have an account?
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              sx={{ ml: 1 }}
            >
              Login
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
