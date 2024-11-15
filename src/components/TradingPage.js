import { React, useState } from "react";
import NavBar from "../components/Navbar";
import ExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Grid2,
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
import Footer from "./Footer";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

//Data for the coins
export const coinOptions = [
  {
    name: "Bitcoin",
    value: "BTC",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    price: 39820.65, // example price
  },
  {
    name: "Ethereum",
    value: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 2743.12, // example price
  },
  {
    name: "Solana",
    value: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 148.57, // example price
  },
  {
    name: "Polkadot",
    value: "DOT",
    image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=022",
    price: 27.43, // example price
  },
  {
    name: "Chainlink",
    value: "LINK",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=022",
    price: 23.89, // example price
  },
  {
    name: "Avalanche",
    value: "AVAX",
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    price: 64.72, // example price
  },
  {
    name: "Uniswap",
    value: "UNI",
    image: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022",
    price: 25.89, // example price
  },
  {
    name: "Aave",
    value: "AAVE",
    image: "https://cryptologos.cc/logos/aave-aave-logo.png?v=022",
    price: 319.78, // example price
  },
  {
    name: "Polygon",
    value: "MATIC",
    image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=022",
    price: 1.47, // example price
  },
  {
    name: "Cosmos",
    value: "ATOM",
    image: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=022",
    price: 34.87, // example price
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
  const [buyCoinAmount, setBuyCoinAmount] = useState("0.00");

  // State for Sell Section
  const [sellCoinAmount, setSellCoinAmount] = useState("0.00");
  const [sellCoinPrice, setSellCoinPrice] = useState(""); // State for the selected coin price

  // State for Buy and Sell Coin Selection
  const [buyCoinSource, setBuyCoinSource] = useState("");
  const [buyCoinDestination, setBuyCoinDestination] = useState("");

  const [sellCoinSource, setSellCoinSource] = useState("");
  const [sellCoinDestination, setSellCoinDestination] = useState("");

  // Auth context to check if the user is logged in
  const { user } = useAuth(); // Destructure the user from the AuthContext 

  // Helper function to get the coin price based on coin value
  const getCoinPrice = (coinValue) => {
    const coin = coinOptions.find((c) => c.value === coinValue);
    return coin ? coin.price : 0;
  };

  const handleBuyAmountChange = (event) => {
    setBuyCoinAmount(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleSellAmountChange = (event) => {
    setSellCoinAmount(
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

  // Snackbar state for popup
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  // Close Snackbar
  const handleClosePopup = () => {
    setPopup({ open: false, message: "", type: "" });
  };

  // Handlers for Buy Section
  const handleBuyCoinSourceChange = (event) => {
    setBuyCoinSource(event.target.value);
  };

  // Handlers for Sell Section
  const handleSellCoinSourceChange = (event) => {
    setSellCoinSource(event.target.value);
  };

  // Handlers for Buy Section
  const handleBuyCoinDestinationChange = (event) => {
    setBuyCoinDestination(event.target.value);
  };

  // Handlers for Sell Section
  const handleSellCoinDestinationChange = (event) => {
    setSellCoinDestination(event.target.value);
  };  

  const buyExchangeRate = buyCoinSource && buyCoinDestination ? getCoinPrice(buyCoinSource) / getCoinPrice(buyCoinDestination) : 0;
  const sellExchangeRate = sellCoinSource && sellCoinDestination ? getCoinPrice(sellCoinSource) / getCoinPrice(sellCoinDestination) : 0;

  const buyTotalPrice = !isNaN(buyCoinAmount) && buyCoinAmount > 0 ? buyCoinAmount * buyExchangeRate : 0;
  const sellTotalPrice = !isNaN(sellCoinAmount) && sellCoinAmount > 0  ? sellCoinAmount * sellExchangeRate : 0;

  // Validate forms
  const validateBuyForm = () => {
    if (!buyCoinSource || !buyCoinDestination || buyCoinAmount <= 0 || isNaN(buyCoinAmount)) {
      return false;
    }
    return true;
  };

  const validateSellForm = () => {
    if (!sellCoinSource || !sellCoinDestination || sellCoinAmount <= 0 || isNaN(sellCoinAmount)) {
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
                value={buyCoinSource}
                onChange={handleBuyCoinSourceChange}
                className="white-background-textfield"
              >
                {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
              <TextField
                label="You'll pay"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={buyCoinAmount}
                onChange={handleBuyAmountChange}
              />
            </Grid2>
          </Grid2>

          <Grid2 className="buy-sell-grid">
            <Grid2>
              <TextField
                  select
                  label="Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={buyCoinDestination}
                  onChange={handleBuyCoinDestinationChange}
                  className="white-background-textfield"
                >
                  {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
              {/* Total Price Calculation */}
              <TextField
                label="You'll receive"
                value={buyTotalPrice.toFixed(2)} // Displaying the total price
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true, // Making the field read-only
                }}
              />
            </Grid2>
          </Grid2>

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
                value={sellCoinSource}
                onChange={handleSellCoinSourceChange}
              >
                {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
              <TextField
                label="You'll sell"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={sellCoinAmount}
                onChange={handleSellAmountChange}
              />
            </Grid2>
          </Grid2>

          <Grid2 className="buy-sell-grid">
            <Grid2>
              <TextField
                  select
                  label="Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={sellCoinDestination}
                  onChange={handleSellCoinDestinationChange}
                  className="white-background-textfield"
                >
                  {coinOption}
              </TextField>
            </Grid2>
            <Grid2>
              {/* Total Price Calculation */}
              <TextField
                label="You'll receive"
                value={sellTotalPrice.toFixed(2)} // Displaying the total price
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true, // Making the field read-only
                }}
              />
            </Grid2>
          </Grid2>

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
      <Footer />
    </>
  );
};

export default TradingPage;
