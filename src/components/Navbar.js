import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/crypto.png';

const NavBar = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Avatar src={logo} alt="Logo" sx={{ width: 56, height: 56 }} />
                    <Button color="inherit" component={Link} to="/">Buy Crypto </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                ) : (
                    <>
                        <Avatar
                            onClick={handleMenuClick}
                            sx={{ cursor: 'pointer', bgcolor: 'primary.main' }}
                        >
                            {user.username.charAt(0).toUpperCase()} {/* Show first letter of username */}
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    History
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={() => { logout(); handleClose(); }}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;