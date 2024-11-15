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
import Footer from "./Footer";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import simpleStorage from "../script/simpleStorage"; // Import the smart contract instance
import web3 from "../script/web3"; // Import web3 for interacting with the blockchain

// Data for the coins
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

// Data for history
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

  const [transactionHistory, setTransactionHistory] = useState([]);


  // State for Buy Section
  const [buyCoinAmount, setBuyCoinAmount] = useState(0.001);
  const [buyCoinPrice, setBuyCoinPrice] = useState("");

  // State for Sell Section
  const [sellCoinAmount, setSellCoinAmount] = useState(0.001);
  const [sellCoinPrice, setSellCoinPrice] = useState("");

  // State for Buy and Sell Coin Selection
  const [buyCoin, setBuyCoin] = useState("");
  const [sellCoin, setSellCoin] = useState("");

  // State for smart contract interactions
  const [contractValue, setContractValue] = useState("");
  const [storedValue, setStoredValue] = useState(null);

  // Calculate Total Price for Buy and Sell Sections
  const buyTotalPrice = buyCoinAmount * buyCoinPrice;
  const sellTotalPrice = sellCoinAmount * sellCoinPrice;

  // Auth context to check if the user is logged in
  const { user } = useAuth();

  // Snackbar state for popup
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

    // Function to fetch transaction history from the smart contract
    const fetchTransactionHistory = async () => {
      if (!simpleStorage) {
        console.error("Smart contract is not initialized.");
        return;
      }
      try {
        // Call the smart contract method to get transaction history
        const history = await simpleStorage.methods.getTransactionHistory().call();
        setTransactionHistory(history); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
    
    // UseEffect to fetch history when the component mounts
  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  
  // Smart contract interaction handlers
  const setValueInContract = async () => {
    if (!simpleStorage) {
      console.error("Smart contract is not initialized.");
      return;
    }
    if (user && contractValue) {
      try {
        const accounts = await web3.eth.getAccounts();
        await simpleStorage.methods.set(contractValue).send({ from: accounts[0] });
        setPopup({ open: true, message: "Value set in contract", type: "success" });
      } catch (error) {
        setPopup({ open: true, message: `Error: ${error.message}`, type: "error" });
      }
    } else {
      setPopup({ open: true, message: "Log in and enter a value", type: "error" });
    }
  };

  const handleBuyTransaction = async () => {
    if (!simpleStorage) {
      console.error("Smart contract is not initialized.");
      return;
    }
    if (!buyCoin || !buyCoinPrice || !buyCoinAmount) {
      setPopup({ open: true, message: "Please select a coin and enter valid values", type: "error" });
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      await simpleStorage.methods
        .set(buyCoinAmount)
        .send({ from: accounts[0] });
      setPopup({ open: true, message: `Successfully bought ${buyCoinAmount} of ${buyCoin}`, type: "success" });
    } catch (error) {
      setPopup({ open: true, message: `Error: ${error.message}`, type: "error" });
    }
  };

  const handleSellTransaction = async () => {
    if (!simpleStorage) {
      console.error("Smart contract is not initialized.");
      return;
    }
    if (!sellCoin || !sellCoinPrice || !sellCoinAmount) {
      setPopup({ open: true, message: "Please select a coin and enter valid values", type: "error" });
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      await simpleStorage.methods
        .set(sellCoinAmount) 
        .send({ from: accounts[0] });
      setPopup({ open: true, message: `Successfully sold ${sellCoinAmount} of ${sellCoin}`, type: "success" });
    } catch (error) {
      setPopup({ open: true, message: `Error: ${error.message}`, type: "error" });
    }
  };
  

  const getValueFromContract = async () => {
    if (!simpleStorage) {
      console.error("Smart contract is not initialized.");
      return;
    }
    try {
      const result = await simpleStorage.methods.get().call();
      setStoredValue(result);
    } catch (error) {
      setPopup({ open: true, message: `Error: ${error.message}`, type: "error" });
    }
  };

  // Handlers for Buy and Sell Section
  const handleBuySliderChange = (event, newValue) => setBuyCoinAmount(newValue);
  const handleBuyInputChange = (event) => setBuyCoinAmount(event.target.value === "" ? "" : Number(event.target.value));
  const handleBuyPriceChange = (event) => setBuyCoinPrice(event.target.value === "" ? "" : Number(event.target.value));
  const handleSellSliderChange = (event, newValue) => setSellCoinAmount(newValue);
  const handleSellInputChange = (event) => setSellCoinAmount(event.target.value === "" ? "" : Number(event.target.value));
  const handleSellPriceChange = (event) => setSellCoinPrice(event.target.value === "" ? "" : Number(event.target.value));

  // Validate forms
  const validateBuyForm = () => buyCoin && buyCoinPrice > 0 && !isNaN(buyCoinPrice);
  const validateSellForm = () => sellCoin && sellCoinPrice > 0 && !isNaN(sellCoinPrice);

  // Close Snackbar
  const handleClosePopup = () => setPopup({ open: false, message: "", type: "" });

  return (
    <>
      <NavBar />
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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
      
      {/* Buy and Sell Section */}
      <Box className="buy-sell-container">
        {/* Buy Section */}
        {/* Buy Section */}
<Box className="buy-sell-box">
  {/* Select Coin and Price Input */}
  <Grid2 className="buy-sell-grid">
    <Grid2>
      <TextField
        select
        label="Type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={buyCoin}
        onChange={(e) => setBuyCoin(e.target.value)}
      >
        {coinOptions.map((coin) => (
          <MenuItem key={coin.name} value={coin.value}>
            <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, marginRight: 10 }} />
            {coin.name}
          </MenuItem>
        ))}
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
        onChange={(e) => setBuyCoinPrice(e.target.value)}
      />
    </Grid2>
  </Grid2>
  {/* Amount Slider */}
  <TextField
    label="Amount"
    value={buyCoinAmount}
    onChange={(e) => setBuyCoinAmount(e.target.value)}
    fullWidth
    margin="normal"
    InputProps={{
      readOnly: true,
      startAdornment: <InputAdornment position="start"><ExchangeIcon /></InputAdornment>,
    }}
  />
  <Slider
    value={buyCoinAmount}
    min={0.001}
    max={1}
    step={0.001}
    onChange={(e, newValue) => setBuyCoinAmount(newValue)}
    valueLabelDisplay="auto"
  />
  {/* Total Price Calculation */}
  <TextField
    label="Total"
    value={buyTotalPrice.toFixed(2)}
    fullWidth
    margin="normal"
    InputProps={{
      readOnly: true,
      endAdornment: <InputAdornment position="end">USD</InputAdornment>,
    }}
  />
  <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={handleBuyTransaction} // Trigger smart contract interaction
  >
    Buy
  </Button>
</Box>

{/* Sell Section */}
<Box className="buy-sell-box">
  {/* Select Coin and Price Input */}
  <Grid2 className="buy-sell-grid">
    <Grid2>
      <TextField
        select
        label="Type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={sellCoin}
        onChange={(e) => setSellCoin(e.target.value)}
      >
        {coinOptions.map((coin) => (
          <MenuItem key={coin.name} value={coin.value}>
            <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, marginRight: 10 }} />
            {coin.name}
          </MenuItem>
        ))}
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
        onChange={(e) => setSellCoinPrice(e.target.value)}
      />
    </Grid2>
  </Grid2>
  <TextField
    label="Amount"
    value={sellCoinAmount}
    onChange={(e) => setSellCoinAmount(e.target.value)}
    fullWidth
    margin="normal"
    InputProps={{
      readOnly: true,
      startAdornment: <InputAdornment position="start"><ExchangeIcon /></InputAdornment>,
    }}
  />
  <Slider
    value={sellCoinAmount}
    min={0.001}
    max={1}
    step={0.001}
    onChange={(e, newValue) => setSellCoinAmount(newValue)}
    valueLabelDisplay="auto"
  />
  <TextField
    label="Total"
    value={sellTotalPrice.toFixed(2)}
    fullWidth
    margin="normal"
    InputProps={{
      readOnly: true,
      endAdornment: <InputAdornment position="end">USD</InputAdornment>,
    }}
  />
  <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={handleSellTransaction} // Trigger smart contract interaction
  >
    Sell
  </Button>
</Box>


        {/* Sell Section */}
        <Box className="buy-sell-box">
          <Grid2 className="buy-sell-grid">
            <Grid2>
              <TextField
                select
                label="Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={sellCoin}
                onChange={(e) => setSellCoin(e.target.value)}
              >
                {coinOptions.map((coin) => (
                  <MenuItem key={coin.name} value={coin.value}>
                    <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, marginRight: 10 }} />
                    {coin.name}
                  </MenuItem>
                ))}
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
          <TextField
            label="Amount"
            value={sellCoinAmount}
            onChange={handleSellInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start"><ExchangeIcon /></InputAdornment>,
            }}
          />
          <Slider
            value={sellCoinAmount}
            min={0.001}
            max={1}
            step={0.001}
            onChange={handleSellSliderChange}
            valueLabelDisplay="auto"
          />
          <TextField
            label="Total"
            value={sellTotalPrice.toFixed(2)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">USD</InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSellTransaction}
          >
            Sell
          </Button>
        </Box>
      </Box>

      {/* Smart Contract Interaction */}
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">Smart Contract Interaction</Typography>
        <TextField
          label="Set Contract Value"
          variant="outlined"
          value={contractValue}
          onChange={(e) => setContractValue(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={setValueInContract} sx={{ marginRight: "10px" }}>
          Set Value
        </Button>
        <Button variant="outlined" color="secondary" onClick={getValueFromContract}>
          Get Value
        </Button>
        {storedValue !== null && (
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            Stored Value: {storedValue}
          </Typography>
        )}
      </Box>

      {/* Snackbar for Popup */}
      <Snackbar
        open={popup.open}
        autoHideDuration={3000}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={popup.type} sx={{ width: "100%" }}>
          {popup.message}
        </Alert>
      </Snackbar>

      {/* History Table */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <Typography variant="h1" paddingTop={2} gutterBottom>
          History
        </Typography>
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
              {transactionHistory.length > 0 ? (
                transactionHistory.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.from}</TableCell>
                    <TableCell>{row.to}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{new Date(row.date * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Footer />
    </>
  );
};

export default TradingPage;
