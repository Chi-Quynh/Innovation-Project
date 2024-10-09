import {React, useState } from 'react';
import NavBar from '../components/Navbar';
import { Button, TextField, MenuItem, Box, Grid2, Slider, InputAdornment, Snackbar, Alert} from '@mui/material';
import Footer from "./Footer";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const TradingPage = () => {
    // State for Buy Section
    const [buyCoinAmount, setBuyCoinAmount] = useState(0.001);
    const [buyCoinPrice, setBuyCoinPrice] = useState(''); // State for the selected coin price

    // State for Sell Section
    const [sellCoinAmount, setSellCoinAmount] = useState(0.001);
    const [sellCoinPrice, setSellCoinPrice] = useState(''); // State for the selected coin price

    // Auth context to check if the user is logged in
    const { user } = useAuth(); // Destructure the user from the AuthContext    

    // Handlers for Buy Section Slider
    const handleBuySliderChange = (event, newValue) => {
        setBuyCoinAmount(newValue);
    };

    const handleBuyInputChange = (event) => {
        setBuyCoinAmount(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBuyPriceChange = (event) => {
        setBuyCoinPrice(event.target.value === '' ? '' : Number(event.target.value));
    };

    // Handlers for Sell Section Slider
    const handleSellSliderChange = (event, newValue) => {
        setSellCoinAmount(newValue);
    };

    const handleSellInputChange = (event) => {
        setSellCoinAmount(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleSellPriceChange = (event) => {
        setSellCoinPrice(event.target.value === '' ? '' : Number(event.target.value));
    };

    const formatCoinAmount = (value) => {
        return `${value}`;
    };

    // Calculate Total Price for Buy and Sell Sections
    const buyTotalPrice = buyCoinAmount * buyCoinPrice;
    const sellTotalPrice = sellCoinAmount * sellCoinPrice;

    // Snackbar state for popup
    const [popup, setPopup] = useState({ open: false, message: '', type: '' });

    // Handle Buy Button Click
    const handleBuyClick = () => {
        // Close the popup first if already open, then trigger a new one
        if (!user) { // If the user is not logged in
            setTimeout(() => {
                setPopup({ open: true, message: 'Error: You must log in first!', type: 'error' });
            }, 0);     
        }
        else if (validateBuyForm()) {
            setTimeout(() => {
                setPopup({ open: true, message: 'Purchased', type: 'success' });
            }, 0);            
        } else {
            setTimeout(() => {
                setPopup({ open: true, message: 'Error: Select a coin and enter a valid price!', type: 'error' });
            }, 0);  
        }
    };

    // Handle Sell Button Click
    const handleSellClick = () => {
        // Close the popup first if already open, then trigger a new one
        setPopup({ open: false, message: '', type: '' });

        if (!user) { // If the user is not logged in
            setTimeout(() => {
                setPopup({ open: true, message: 'Error: You must log in first!', type: 'error' });
            }, 0);     
        }
        else if (validateSellForm()) {
            setTimeout(() => {
                setPopup({ open: true, message: 'Sold', type: 'success' });
            }, 0);
        } else {
            setTimeout(() => {
                setPopup({ open: true, message: 'Error: Select a coin and enter a valid price!', type: 'error' });
            }, 0);        
        }
    };

    // Close Snackbar
    const handleClosePopup = () => {
        setPopup({ open: false, message: '', type: '' });
    };

    const [buyCoin, setBuyCoin] = useState('');
    const [sellCoin, setSellCoin] = useState('');

    // Handlers for Buy Section
    const handleBuyCoinChange = (event) => {
        setBuyCoin(event.target.value);
    };

    // Handlers for Sell Section
    const handleSellCoinChange = (event) => {
        setSellCoin(event.target.value);
    };

    // Validate forms
    const validateBuyForm = () => {
        if (!buyCoin || buyCoinPrice <= 0 || isNaN(buyCoinPrice)) {
            return false;
        }
        return true;
    };

    const validateSellForm = () => {
        if (!sellCoin || sellCoinPrice <= 0 || isNaN(sellCoinPrice)) {
            return false;
        }
        return true;
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh', // Make the container at least the height of the viewport
                    display: 'flex',
                    flexDirection: 'column', // Stack content and footer vertically
                }}
            >
                <NavBar />

                {/*  Main content MUST BE PLACED HERE to keep the footer bottom */}
                <Box sx={{ flex: '1', position: 'relative' }}>
                        <Grid2 container spacing={10} justifyContent="center" alignItems="center" sx={{ minHeight: '75vh'  }}> {/* minHeight is tailed exactly to make the page not pad unnecessary space */}
                            {/* Buy Section */}
                            <Grid2 item size={5}>
                                <Box border={1} borderRadius={2} p={2} textAlign="center">
                                    {/* Row for Select Coin and Price Input */}
                                    <Grid2 container spacing={2}>
                                        <Grid2 item size={4}>
                                            <TextField
                                                select
                                                label="Coin"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={buyCoin}
                                                onChange={handleBuyCoinChange}
                                            >
                                                <MenuItem value="BTC">Bitcoin</MenuItem>
                                                <MenuItem value="ETH">Ethereum</MenuItem>
                                                <MenuItem value="SOL">Solana</MenuItem>
                                                <MenuItem value="DOT">Polkadot</MenuItem>
                                                <MenuItem value="LINK">Chainlink</MenuItem>
                                                <MenuItem value="AVAX">Avalanche</MenuItem>
                                                <MenuItem value="UNI">Uniswap</MenuItem>
                                                <MenuItem value="AAVE">Aave</MenuItem>
                                                <MenuItem value="MATIC">Polygon</MenuItem>
                                                <MenuItem value="ATOM">Cosmos</MenuItem>
                                            </TextField>
                                        </Grid2>
                                        <Grid2 item size={8}>
                                            <TextField
                                                label="Price"
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={buyCoinPrice}
                                                onChange={handleBuyPriceChange}
                                            />
                                        </Grid2>
                                    </Grid2>
                                    {/* Number of Coins with Slider for Buy Section */}
                                    <TextField
                                        label="Amount"
                                        value={buyCoinAmount}
                                        onChange={handleBuyInputChange}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            inputProps: {
                                                min: 0,
                                                step: 0.001,
                                            },
                                        }}
                                    />
                                    <Slider
                                        value={buyCoinAmount}
                                        min={0.001}
                                        max={1}
                                        step={0.001}
                                        onChange={handleBuySliderChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={formatCoinAmount}
                                    />
                                    <Box display="flex" justifyContent="space-between">
                                        <span>0</span>
                                        <span>100%</span>
                                    </Box>
                                    {/* Total Price Calculation */}
                                    <TextField
                                        label="Total"
                                        value={buyTotalPrice.toFixed(2)} // Displaying the total price
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true, // Making the field read-only
                                            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                        }}
                                    />
                                    <Button variant="contained" color="primary" fullWidth onClick={handleBuyClick}>
                                        Buy
                                    </Button>
                                </Box>
                            </Grid2>

                            {/* Sell Section */}
                            <Grid2 item size={5}>
                                <Box border={1} borderRadius={2} p={2} textAlign="center">
                                    {/* Row for Select Coin and Price Input */}
                                    <Grid2 container spacing={2}>
                                        <Grid2 item size={4}>
                                            <TextField
                                                select
                                                label="Coin"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={sellCoin}
                                                onChange={handleSellCoinChange}
                                            >
                                                <MenuItem value="BTC">Bitcoin</MenuItem>
                                                <MenuItem value="ETH">Ethereum</MenuItem>
                                                <MenuItem value="SOL">Solana</MenuItem>
                                                <MenuItem value="DOT">Polkadot</MenuItem>
                                                <MenuItem value="LINK">Chainlink</MenuItem>
                                                <MenuItem value="AVAX">Avalanche</MenuItem>
                                                <MenuItem value="UNI">Uniswap</MenuItem>
                                                <MenuItem value="AAVE">Aave</MenuItem>
                                                <MenuItem value="MATIC">Polygon</MenuItem>
                                                <MenuItem value="ATOM">Cosmos</MenuItem>
                                            </TextField>
                                        </Grid2>
                                        <Grid2 item size={8}>
                                            <TextField
                                                label="Price"
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={sellCoinPrice}
                                                onChange={handleSellPriceChange}
                                            />
                                        </Grid2>
                                    </Grid2>
                                    {/* Number of Coins with Slider for Sell Section */}
                                    <TextField
                                        label="Amount"
                                        value={sellCoinAmount}
                                        onChange={handleSellInputChange}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            inputProps: {
                                                min: 0,
                                                step: 0.001,
                                            },
                                        }}
                                    />
                                    <Slider
                                        value={sellCoinAmount}
                                        min={0.001}
                                        max={1}
                                        step={0.001}
                                        onChange={handleSellSliderChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={formatCoinAmount}
                                    />
                                    <Box display="flex" justifyContent="space-between">
                                        <span>0</span>
                                        <span>100%</span>
                                    </Box>
                                    {/* Total Price Calculation */}
                                    <TextField
                                        label="Total"
                                        value={sellTotalPrice.toFixed(2)} // Displaying the total price
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true, // Making the field read-only
                                            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                        }}
                                    />
                                    <Button variant="contained" color="secondary" fullWidth onClick={handleSellClick}>
                                        Sell
                                    </Button>
                                </Box>
                            </Grid2>
                        </Grid2>                     

                    {/* Snackbar for Popup */}
                    <Snackbar
                        open={popup.open}
                        autoHideDuration={3000}
                        onClose={handleClosePopup}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert 
                            severity={popup.type} 
                            sx={{ 
                                width: '100%', 
                            }}
                        >
                            {popup.message}
                        </Alert>
                    </Snackbar>
                </Box>
                {/* End of main content */}
                
                <Footer/>    
            </Box>       
        </>
    )
}

export default TradingPage;