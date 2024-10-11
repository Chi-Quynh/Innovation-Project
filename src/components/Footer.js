import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#6f3bff", // Dark blue background color
        color: "white",
        padding: "2px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        width: "100%",
        bottom: 0,
      }}
    >
      {/* Left Side - Logo */}
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "5vh" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          S
        </Typography>
        <Typography variant="h6">olar</Typography>
      </Box>

      {/* Center - Copyright */}
      <Typography variant="body2" fontSize={10}>
        © Copyright 2024. by GroupSet1
      </Typography>

      {/* Right Side - Social Media Icons */}
      <Box sx={{ display: "flex", gap: "10px", marginRight: "5vh" }}>
        <IconButton
          component={Link}
          href="https://facebook.com"
          sx={{ color: "white" }}
          target="_blank"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://twitter.com"
          sx={{ color: "white" }}
          target="_blank"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://linkedin.com"
          sx={{ color: "white" }}
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://instagram.com"
          sx={{ color: "white" }}
          target="_blank"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
