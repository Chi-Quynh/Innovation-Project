import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Tabs, Tab, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './Navbar'; // Import the NavBar component

// Your crypto data is here in the same file
const data = [
    { 
        name: 'Bitcoin', 
        price: '$44,000', 
        change: '+2%', 
        marketCap: '$800B', 
        category: 'Layer 1'
    },
    { 
        name: 'Ethereum', 
        price: '$3,000', 
        change: '-1%', 
        marketCap: '$350B',
        category: 'Layer 2'
    },
    { 
        name: 'Solana', 
        price: '$150', 
        change: '+5%', 
        marketCap: '$45B', 
        category: 'Layer 1'
    },
    { 
        name: 'Polkadot', 
        price: '$28', 
        change: '-3%', 
        marketCap: '$30B',
        category: 'Layer 0'
    },
    { 
        name: 'Chainlink', 
        price: '$24', 
        change: '+1%', 
        marketCap: '$10B',
        category: 'Oracles'
    },
    { 
        name: 'Avalanche', 
        price: '$65', 
        change: '+7%', 
        marketCap: '$20B',
        category: 'Layer 1'
    },
    { 
        name: 'Uniswap', 
        price: '$25', 
        change: '-4%', 
        marketCap: '$15B',
        category: 'DeFi'
    },
    { 
        name: 'Aave', 
        price: '$320', 
        change: '+3%', 
        marketCap: '$5B',
        category: 'DeFi'
    },
    { 
        name: 'Polygon', 
        price: '$1.50', 
        change: '+8%', 
        marketCap: '$12B',
        category: 'Layer 2'
    },
    { 
        name: 'Cosmos', 
        price: '$35', 
        change: '-2%', 
        marketCap: '$8B',
        category: 'Interoperability'
    }
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [assetCategory, setAssetCategory] = useState(''); // to set category for filtering digital assets
    const [filteredAssets, setFilteredAssets] = useState(data);

    const handleSearch = (value) => {
        setSearchTerm(value); // from e.target.value in onChange in TextField
        const results = filterAssets(value, assetCategory);
        setFilteredAssets(results);
    };

    // Handle tab change for category filtering
    const handleTabChange = (event, newValue) => {
        setAssetCategory(newValue);
        const results = filterAssets(searchTerm, newValue);
        setFilteredAssets(results);
    };

    // Asset filtering based on search and category
    const filterAssets = (searchTerm, assetCategory) => {
        return data.filter(asset => 
            asset.category.toLowerCase().includes(assetCategory.toLowerCase()) &&
            asset.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <>
            {/* Reuse the NavBar component */}
            <NavBar />

            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Tabs value={assetCategory} onChange={handleTabChange}>
                    <Tab label="All" value="" />
                    <Tab label="Layer 0" value="Layer 0" />
                    <Tab label="Layer 1" value="Layer 1" />
                    <Tab label="Layer 2" value="Layer 2" />
                    <Tab label="Oracles" value="Oracles" />
                    <Tab label="DeFi" value="DeFi" />
                    <Tab label="Interoperability" value="Interoperability" />
                </Tabs>
                <TextField 
                    label="Search" 
                    variant="outlined" 
                    size="small" 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Box>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: "70%", margin: "auto", marginTop: "20px" }}
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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.change}</TableCell>
                <TableCell>{row.marketCap}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to="/trade"
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{ margin: "10px" }}
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
