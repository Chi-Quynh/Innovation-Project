import React from 'react';
import NavBar from '../components/Navbar';
import { Button, TextField, MenuItem, Box, Grid2 } from '@mui/material';

const TradingPage = () => {
    return (
        <>
            <NavBar />
            {/* Content */}
            <Box sx={{ p: 2 }}>
                <Grid2 container spacing={10} justifyContent="center">
                    {/* Buy Section */}
                    <Grid2 item size={5}>
                        <Box border={1} borderRadius={2} p={2} textAlign="center">
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            {/* Row for Select Coin and Number Input */}
                            <Grid2 container spacing={2}>
                                <Grid2 item size={6}>
                                    <TextField
                                        select
                                        label="Coin"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    >
                                        <MenuItem value="BTC">Bitcoin (BTC)</MenuItem>
                                        <MenuItem value="ETH">Ethereum (ETH)</MenuItem>
                                        <MenuItem value="SOL">Solana (SOL)</MenuItem>
                                        <MenuItem value="DOT">Polkadot (DOT)</MenuItem>
                                        <MenuItem value="LINK">Chainlink (LINK)</MenuItem>
                                        <MenuItem value="AVAX">Avalanche (AVAX)</MenuItem>
                                        <MenuItem value="UNI">Uniswap (UNI)</MenuItem>
                                        <MenuItem value="AAVE">Aave (AAVE)</MenuItem>
                                        <MenuItem value="MATIC">Polygon (MATIC)</MenuItem>
                                        <MenuItem value="ATOM">Cosmos (ATOM)</MenuItem>
                                    </TextField>
                                </Grid2>
                                <Grid2 item size={6}>
                                    <TextField
                                        label="Number of Coins"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid2>
                            </Grid2>
                            <Button variant="contained" color="primary">
                                Buy
                            </Button>
                        </Box>
                    </Grid2>

                    {/* Sell Section */}
                    <Grid2 item size={5}>
                        <Box border={1} borderRadius={2} p={2} textAlign="center">
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <Grid2 container spacing={2}>
                                <Grid2 item size={6}>
                                    <TextField
                                        select
                                        label="Coin"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    >
                                        <MenuItem value="BTC">Bitcoin (BTC)</MenuItem>
                                        <MenuItem value="ETH">Ethereum (ETH)</MenuItem>
                                        <MenuItem value="SOL">Solana (SOL)</MenuItem>
                                        <MenuItem value="DOT">Polkadot (DOT)</MenuItem>
                                        <MenuItem value="LINK">Chainlink (LINK)</MenuItem>
                                        <MenuItem value="AVAX">Avalanche (AVAX)</MenuItem>
                                        <MenuItem value="UNI">Uniswap (UNI)</MenuItem>
                                        <MenuItem value="AAVE">Aave (AAVE)</MenuItem>
                                        <MenuItem value="MATIC">Polygon (MATIC)</MenuItem>
                                        <MenuItem value="ATOM">Cosmos (ATOM)</MenuItem>
                                    </TextField>
                                </Grid2>
                                <Grid2 item size={6}>
                                    <TextField
                                        label="Number of Coins"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid2>
                            </Grid2>
                            <Button variant="contained" color="secondary" >
                                Sell
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>            
        </>
    )
}

export default TradingPage;