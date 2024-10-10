import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/Navbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/"); // Redirect to homepage on successful login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          width: "100%", // Ensures the container takes the full width of its parent
          height: "100vh", // Adjust the height as needed
        }}
      >
        {/* Image Box */}
        <Box
          sx={{
            display: "flex",
            width: "500px", // Ensures the Box takes full width of its parent
            height: "100%", // Set a specific height or make it responsive as needed
            overflow: "hidden", // Ensures no part of the image spills outside the container
          }}
        >
          <img
            src="https://crypto.news/app/uploads/2024/02/crypto-news-dollar-option03.webp"
            alt="BitCoinLoginPage"
            style={{
              width: "100%", // Makes the image take up 100% of the box's width
              height: "100%", // Adjust height to 100% of the box
              objectFit: "cover", // Covers the entire box, may cut off parts of the image
              objectPosition: "left", // Focus on the right part of the image
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginTop: "6vh",
              width: "500px", // Ensures the Box takes full width of its parent
              height: "100%",
              backgroundColor: "rgba(211, 226, 241, 0.75))", // Adjust opacity for darker or lighter effect
            }}
          ></Box>
        </Box>

        {/* Login Form Box */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "#f5f5f5", width: "70vh", padding: 3 }} // Light background color, padding for internal spacing
        >
          <Typography variant="h4" gutterBottom>
            Login to Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              width: 300, // Fixed width for the form
              display: "flex",
              flexDirection: "column",
              mt: 2, // Margin top for spacing from the header
            }}
          >
            <Typography align="left" gutterBottom>
              Gmail
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Typography align="left" gutterBottom>
              Password
            </Typography>
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
              sx={{ mt: 2 }} // Margin top for the button
            >
              Login
            </Button>
          </Box>

          <Typography sx={{ mt: 2 }}>
            Don't have an account?
            <MuiLink
              component={Link}
              to="/signup"
              underline="hover"
              sx={{ ml: 1 }} // Margin left for a little space
            >
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
