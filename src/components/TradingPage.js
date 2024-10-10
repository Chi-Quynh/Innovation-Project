import { React, useState } from "react";
import NavBar from "../components/Navbar";
import ExchangeIcon from "@mui/icons-material/CurrencyExchange";
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

//Data for the coins
export const coinOptions = [
  {
    name: "Bitcoin",
    value: "BTC",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    value: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Solana",
    value: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "Polkadot",
    value: "DOT",
    image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=022",
  },
  {
    name: "Chainlink",
    value: "LINK",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=022",
  },
  {
    name: "Avalanche",
    value: "AVAX",
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
  },
  {
    name: "Uniswap",
    value: "UNI",
    image: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022",
  },
  {
    name: "Aave",
    value: "AAVE",
    image: "https://cryptologos.cc/logos/aave-aave-logo.png?v=022",
  },
  {
    name: "Polygon",
    value: "MATIC",
    image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=022",
  },
  {
    name: "Cosmos",
    value: "ATOM",
    image: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=022",
  },
];

//Data for history
export const historyData = [
  {
    id: 1,
    type: "Buy",
    from: "Exchange",
    to: "Wallet",
    amount: 0.5,
    date: "2024-10-01",
  },
  {
    id: 2,
    type: "Sell",
    from: "Wallet",
    to: "Exchange",
    amount: 0.2,
    date: "2024-10-02",
  },
  {
    id: 3,
    type: "Buy",
    from: "Exchange",
    to: "Wallet",
    amount: 0.3,
    date: "2024-10-03",
  },
  {
    id: 4,
    type: "Sell",
    from: "Wallet",
    to: "Exchange",
    amount: 0.1,
    date: "2024-10-04",
  },
];

const TradingPage = () => {
  // State for Buy Section
  const [buyCoinAmount, setBuyCoinAmount] = useState(0.001);
  const [buyCoinPrice, setBuyCoinPrice] = useState(""); // State for the selected coin price

  // State for Sell Section
  const [sellCoinAmount, setSellCoinAmount] = useState(0.001);
  const [sellCoinPrice, setSellCoinPrice] = useState(""); // State for the selected coin price

  // State for Buy and Sell Coin Selection
  const [buyCoin, setBuyCoin] = useState("");
  const [sellCoin, setSellCoin] = useState("");

  // Calculate Total Price for Buy and Sell Sections
  const buyTotalPrice = buyCoinAmount * buyCoinPrice;
  const sellTotalPrice = sellCoinAmount * sellCoinPrice;

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
  //Sell coin options
  const coinOption = coinOptions.map((coin) => (
    <MenuItem key={coin.name} value={coin.value}>
      <img
        src={coin.image}
        alt={coin.name}
        style={{
          width: 24,
          height: 24,
          marginRight: 10,
          verticalAlign: "middle",
        }}
      />
      {coin.name}
    </MenuItem>
  ));

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
      <Box
        sx={{
          justifyContent: "center", // Centers content horizontally
          alignItems: "center", // Centers content vertically
          textAlign: "center", // Ensures text is centered within the Typography
          height: "15vh",
          backgroundColor: "#6f3bff",
          color: "#faf8f7",
        }}
      >
        <Box>
          <Typography variant="h1">Trading</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ color: "#e8e8e8" }} gutterBottom>
            Easy | Secure | Fast
          </Typography>
        </Box>
      </Box>
      <Box className="buy-sell-container">
        {/* Buy Section */}

        <Box className="buy-sell-box">
          {/* Row for Select Coin and Price Input */}
          <Grid2 className="buy-sell-grid">
            <Grid2>
              <TextField
                select
                label="Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={buyCoin}
                onChange={handleBuyCoinChange}
                className="white-background-textfield"
              >
                {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
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
              startAdornment: (
                <InputAdornment position="start">
                  <ExchangeIcon />
                </InputAdornment>
              ),
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

          {/* Total Price Calculation */}
          <TextField
            label="Total"
            value={buyTotalPrice.toFixed(2)} // Displaying the total price
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true, // Making the field read-only
              endAdornment: <InputAdornment position="end">BTC</InputAdornment>,
            }}
          />
          <Box className="buy-sell-button">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuyClick}
            >
              Buy
            </Button>
          </Box>
        </Box>

        {/* Sell Section */}

        <Box className="buy-sell-box">
          {/* Row for Select Coin and Price Input */}
          <Grid2 className="buy-sell-grid">
            <Grid2>
              <TextField
                select
                label="Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={sellCoin}
                onChange={handleSellCoinChange}
              >
                {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
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
              startAdornment: (
                <InputAdornment position="start">
                  <ExchangeIcon />
                </InputAdornment>
              ),
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

          {/* Total Price Calculation */}
          <TextField
            label="Total"
            value={sellTotalPrice.toFixed(2)} // Displaying the total price
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true, // Making the field read-only
              endAdornment: <InputAdornment position="end">BTC</InputAdornment>,
            }}
          />
          <Box className="buy-sell-button">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSellClick}
            >
              Sell
            </Button>
          </Box>
        </Box>

        {/* Snackbar for Popup */}
        <Snackbar
          open={popup.open}
          autoHideDuration={3000}
          onClose={handleClosePopup}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
      </Box>
      {/* History Table */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack Typography and Table vertically
          alignItems: "center", // Centers both Typography and Table horizontally
          marginTop: "20px",
          width: "100%", // Ensures it spans the full width
        }}
      >
        <Typography variant="h1" paddingTop={2} gutterBottom>
          History
        </Typography>
        {/* Centered Table */}
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "80%",
            border: "1px solid #d3d3d3",
            margin: "2em",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { border: "1px solid #d3d3d3" } }}>
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
