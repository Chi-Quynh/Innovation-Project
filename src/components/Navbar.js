import React from "react";
import { AppBar, Toolbar, Button, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../images/Crypto.png"; // Ensure this path is correct for your logo

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        height: "7vh", // Adjust if necessary for your design
        padding: "0px",
        backgroundColor: "#6f3bff", // Consistent theme color
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: "48px",
          padding: "0px",
          justifyContent: "space-between", // This will align items as required
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar src={logo} sx={{ width: 35, height: 35, marginRight: 2 }} />
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/trade">
            Trade
          </Button>
        </Box>

        {user ? (
          <>
            <Box display="flex" alignItems="center">
              <Avatar
                alt={user.username}
                sx={{
                  width: 35,
                  height: 35,
                  marginRight: 2,
                  backgroundColor: "#fff",
                  color: "#6f3bff",
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center">
            <Button
              sx={{
                backgroundColor: "white",
                color: "#6f3bff",
                height: "30px",
                "&:hover": {
                  backgroundColor: "#ddd",
                },
              }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                height: "30px",
                backgroundColor: "#000",
                ml: 2, // Adding a left margin for spacing between buttons
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
