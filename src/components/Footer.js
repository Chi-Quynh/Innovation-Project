import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#0c135f', // Dark blue background color
                color: 'white',
                padding: '20px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                width: '100%',
                bottom: 0,
            }}
        >
            {/* Left Side - Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5vh', }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        color: 'lightpink',
                    }}
                >
                    C
                </Typography>
                <Typography variant="h6">ryptoc</Typography>
            </Box>

            {/* Center - Copyright */}
            <Typography
                variant="body2"
                sx={{
                    color: '#b0b3b8',
                }}
            >
                © Copyright 2024. by WPDeveloper
            </Typography>

            {/* Right Side - Social Media Icons */}
            <Box sx={{ display: 'flex', gap: '10px', marginRight: '5vh', }}>
                <IconButton
                    component={Link}
                    href="https://facebook.com"
                    sx={{ color: 'white' }}
                    target="_blank"
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://twitter.com"
                    sx={{ color: 'white' }}
                    target="_blank"
                >
                    <TwitterIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://linkedin.com"
                    sx={{ color: 'white' }}
                    target="_blank"
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://instagram.com"
                    sx={{ color: 'white' }}
                    target="_blank"
                >
                    <InstagramIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
