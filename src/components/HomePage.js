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
import Footer from "./Footer";
import server from "../script/server"; // Import the server object
// Your crypto data is here in the same file

const HomePage = () => {
  const data = server.getData("Tokens"); // Fetch data from the server
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
          minHeight: "100vH", //quick fix for the footer stay in the middle of the page, side effect unnecessary blank space
        }}
      >
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
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
