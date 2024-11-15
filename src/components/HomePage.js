import React, { useState, useEffect  } from "react";
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
import Footer from "./Footer"
import { fetchTokens } from '../database/SupabaseTokenAPI'; // Adjust the path if necessary

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]); // State to hold the fetched tokens

  // Fetch the data from Supabase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const tokens = await fetchTokens(); // Fetch tokens from Supabase
      setAllAssets(tokens || []); // Set the fetched tokens to state
      setFilteredAssets(tokens || []); // Initially set the filteredAssets to all tokens
    };

    fetchData(); // Call the fetch function
  }, []);

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
    return allAssets.filter(
      (asset) =>
        asset.category.toLowerCase().includes(assetCategory.toLowerCase()) &&
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatMarketCap = (value) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(0)}B`; // Format as billions
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`; // Format as millions
    } else {
      return `$${value}`; // Default format
    }
  };

  return (
    <>
      <NavBar />
       <Box sx={{
        minHeight: '100vH', //quick fix for the footer stay in the middle of the page, side effect unnecessary blank space
        }}> 
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
              {filteredAssets.length > 0 ? (
                filteredAssets.map((row) => (
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
                            objectFit: "contain",
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
                    <TableCell>${row.price}</TableCell>
                    <TableCell
                      sx={{
                        color: row.change >= 0 ? "green" : "red",
                      }}
                    >
                      {row.change >= 0 ? `+${row.change}` : row.change}%
                    </TableCell>
                    <TableCell>{formatMarketCap(row.marketCap)}</TableCell>
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
                ))
              ): null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
