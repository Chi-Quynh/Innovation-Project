import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Grid2,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "./Navbar"; // Import the NavBar component

// Your crypto data is here in the same file
const data = [
  {
    name: "Bitcoin",
    price: "$44,000",
    change: "+2%",
    marketCap: "$800B",
    category: "Layer 1",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", // Correct image URL for Bitcoin
  },
  {
    name: "Ethereum",
    price: "$3,000",
    change: "-1%",
    marketCap: "$350B",
    category: "Layer 2",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png", // Correct image URL for Ethereum
  },
  {
    name: "Solana",
    price: "$150",
    change: "+5%",
    marketCap: "$45B",
    category: "Layer 1",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png", // Correct image URL for Solana
  },
  {
    name: "Polkadot",
    price: "$28",
    change: "-3%",
    marketCap: "$30B",
    category: "Layer 0",
    image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=022", // Polkadot Logo
  },
  {
    name: "Chainlink",
    price: "$24",
    change: "+1%",
    marketCap: "$10B",
    category: "Oracles",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=022", // Chainlink Logo
  },
  {
    name: "Avalanche",
    price: "$65",
    change: "+7%",
    marketCap: "$20B",
    category: "Layer 1",
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022", // Avalanche Logo
  },
  {
    name: "Uniswap",
    price: "$25",
    change: "-4%",
    marketCap: "$15B",
    category: "DeFi",
    image: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022", // Uniswap Logo
  },
  {
    name: "Aave",
    price: "$320",
    change: "+3%",
    marketCap: "$5B",
    category: "DeFi",
    image: "https://cryptologos.cc/logos/aave-aave-logo.png?v=022", // Aave Logo
  },
  {
    name: "Polygon",
    price: "$1.50",
    change: "+8%",
    marketCap: "$12B",
    category: "Layer 2",
    image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=022", // Polygon (Matic) Logo
  },
  {
    name: "Cosmos",
    price: "$35",
    change: "-2%",
    marketCap: "$8B",
    category: "Interoperability",
    image: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=022", // Cosmos Logo
  },
  // Add more assets with their images...
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [filteredAssets, setFilteredAssets] = useState(data);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const results = filterAssets(value, assetCategory);
    setFilteredAssets(results);
  };

  const handleTabChange = (event, newValue) => {
    setAssetCategory(newValue);
    const results = filterAssets(searchTerm, newValue);
    setFilteredAssets(results);
  };

  const filterAssets = (searchTerm, assetCategory) => {
    return data.filter(
      (asset) =>
        asset.category.toLowerCase().includes(assetCategory.toLowerCase()) &&
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      <NavBar />

      <Box
        sx={{
          marginTop: "20px",
          maxWidth: "70%",
          margin: "auto",
          paddingTop: "10px",
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} sm={6}>
            <Tabs
              value={assetCategory}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { display: "none" } }}
              sx={{
                "& .MuiTab-root": {
                  margin: "0 10px",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  textTransform: "none",
                  backgroundColor: "#f0f0f0",
                  color: "#000",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ddd",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#6f3bff",
                    color: "#fff",
                  },
                },
              }}
            >
              <Tab label="All" value="" />
              <Tab label="Oracles" value="Oracles" />
              <Tab label="DeFi" value="DeFi" />
              <Tab label="Interoperability" value="Interoperability" />
            </Tabs>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              size="small"
              sx={{
                width: "30em",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
                "& .MuiInputLabel-root": {
                  color: "grey",
                  fontSize: "17px",
                },
              }}
            />
          </Grid2>
        </Grid2>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "50%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h Change</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  {/* Image + Name */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={row.image}
                      alt={row.name}
                      style={{
                        width: "30px",
                        height: "30px",

                        objectFit: "contain", // Ensures the image fits the container properly
                        marginRight: "10px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/30"; // Fallback image if the URL is broken
                      }}
                    />
                    <Box style={{ marginLeft: "2em" }}>{row.name}</Box>
                  </Box>
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell
                  sx={{
                    color: row.change.startsWith("+")
                      ? "green"
                      : row.change.startsWith("-")
                      ? "red"
                      : "black",
                  }}
                >
                  {row.change}
                </TableCell>
                <TableCell>{row.marketCap}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to="/trade"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Trade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HomePage;
