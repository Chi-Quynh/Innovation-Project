import { React, useState } from "react";
import NavBar from "../components/Navbar";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Grid2,
  Slider,
  InputAdornment,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TradingPage = () => {
  // State for Buy Section
  const [buyCoinAmount, setBuyCoinAmount] = useState(0.001);
  const [buyCoinPrice, setBuyCoinPrice] = useState(""); // State for the selected coin price

  // State for Sell Section
  const [sellCoinAmount, setSellCoinAmount] = useState(0.001);
  const [sellCoinPrice, setSellCoinPrice] = useState(""); // State for the selected coin price

  // Sample data for the history table (replace this with your actual data)
  const historyData = [
    {
      id: 1,
      type: "Deposit",
      from: "Bank",
      to: "Wallet",
      amount: 0.5,
      date: "2024-10-01",
    },
    {
      id: 2,
      type: "Withdrawal",
      from: "Wallet",
      to: "Bank",
      amount: 0.2,
      date: "2024-10-02",
    },
    {
      id: 3,
      type: "Trade",
      from: "Wallet",
      to: "Exchange",
      amount: 0.15,
      date: "2024-10-03",
    },
    {
      id: 4,
      type: "Transfer",
      from: "User A",
      to: "User B",
      amount: 0.1,
      date: "2024-10-04",
    },
  ];

  // Handlers for Buy Section Slider
  const handleBuySliderChange = (event, newValue) => {
    setBuyCoinAmount(newValue);
  };

  const handleBuyInputChange = (event) => {
    setBuyCoinAmount(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBuyPriceChange = (event) => {
    setBuyCoinPrice(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  // Handlers for Sell Section Slider
  const handleSellSliderChange = (event, newValue) => {
    setSellCoinAmount(newValue);
  };

  const handleSellInputChange = (event) => {
    setSellCoinAmount(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleSellPriceChange = (event) => {
    setSellCoinPrice(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const formatCoinAmount = (value) => {
    return `${value}`;
  };

  // Calculate Total Price for Buy and Sell Sections
  const buyTotalPrice = buyCoinAmount * buyCoinPrice;
  const sellTotalPrice = sellCoinAmount * sellCoinPrice;

  // Snackbar state for popup
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  // Handle Buy Button Click
  const handleBuyClick = () => {
    // Close the popup first if already open, then trigger a new one
    setPopup({ open: false, message: "", type: "" });
    if (validateBuyForm()) {
      setTimeout(() => {
        setPopup({ open: true, message: "Purchased", type: "success" });
      }, 0);
    } else {
      setTimeout(() => {
        setPopup({
          open: true,
          message: "Error: Select a coin and enter a valid price!",
          type: "error",
        });
      }, 0);
    }
  };

  // Handle Sell Button Click
  const handleSellClick = () => {
    // Close the popup first if already open, then trigger a new one
    setPopup({ open: false, message: "", type: "" });
    if (validateSellForm()) {
      setTimeout(() => {
        setPopup({ open: true, message: "Sold", type: "success" });
      }, 0);
    } else {
      setTimeout(() => {
        setPopup({
          open: true,
          message: "Error: Select a coin and enter a valid price!",
          type: "error",
        });
      }, 0);
    }
  };

  // Close Snackbar
  const handleClosePopup = () => {
    setPopup({ open: false, message: "", type: "" });
  };

  const [buyCoin, setBuyCoin] = useState("");
  const [sellCoin, setSellCoin] = useState("");

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
      <NavBar />
      {/* Content */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Grid2
          container
          spacing={10}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh", minWidth: "100%" }}
        >
          {/* Buy Section */}
          <Grid2 item size={5}>
            <Box
              border={1}
              borderRadius={2}
              p={2}
              textAlign="center"
              padding={3}
            >
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
                  endAdornment: (
                    <InputAdornment position="end">BTC</InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleBuyClick}
              >
                Buy
              </Button>
            </Box>
          </Grid2>

          {/* Sell Section */}
          <Grid2 item size={5}>
            <Box
              border={1}
              borderRadius={2}
              p={2}
              textAlign="center"
              padding={3}
            >
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
                  endAdornment: (
                    <InputAdornment position="end">BTC</InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleSellClick}
              >
                Sell
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      {/* Snackbar for Popup */}
      <Snackbar
        open={popup.open}
        autoHideDuration={3000}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={popup.type}
          sx={{
            width: "100%",
          }}
        >
          {popup.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack Typography and Table vertically
          alignItems: "center", // Centers both Typography and Table horizontally
          marginTop: "20px",
          width: "100%", // Ensures it spans the full width
        }}
      >
        {/* Centered Typography for History */}
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          History
        </Typography>

        {/* Centered Table */}
        <TableContainer component={Paper} sx={{ maxWidth: "80%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount (BTC)</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell>{row.amount} BTC</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TradingPage;
