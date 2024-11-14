import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../script/auth";
import NavBar from "../components/Navbar";
import SignupImg from "../images/2363386.jpg"; //Import image from the images
import Footer from "./Footer";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Use email instead of username
  const [password, setPassword] = useState("");
  const { login, error } = useAuth(); // Access the login and error state from AuthContext
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password); // Try logging in with email and password

    if (success) {
      navigate("/"); // Redirect to homepage on successful login
    } else {
      alert(error || "Invalid credentials"); // Show the error from context or a default message
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

        {/* Login Form Box */}
        <Box className="account-sign">
          <Typography variant="h4" gutterBottom>
            Welcome back
          </Typography>

          {/* Email input instead of username */}

          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleLogin}
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
            Returning user?
            <MuiLink
              component={Link}
              to="/signup"
              underline="hover"
              sx={{ ml: 1 }}
            >
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
