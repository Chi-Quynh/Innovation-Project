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
import SignupImg from "../images/2363386.jpg";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(username, password);
    navigate("/login"); // Redirect to login after signup
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
            height: "100vh", // Set a specific height or make it responsive as needed
            overflow: "hidden", // Ensures no part of the image spills outside the container
          }}
        >
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
        <Typography variant="h4" gutterBottom>
          Let's get started
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignup}
          width="300px"
          display="flex"
          flexDirection="column"
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
            sx={{ mt: 2 }}
          >
            Sign up
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
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </>
  );
};

export default SignupPage;
