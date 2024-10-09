import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NavBar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const HistoryPage = () => {
    const { user } = useAuth(); // Access the logged-in user's information

    // Sample data for the history table (replace this with your actual data)
    const historyData = [
        { id: 1, type: 'Deposit', from: 'Bank', to: 'Wallet', amount: 0.5, date: '2024-10-01' },
        { id: 2, type: 'Withdrawal', from: 'Wallet', to: 'Bank', amount: 0.2, date: '2024-10-02' },
        { id: 3, type: 'Trade', from: 'Wallet', to: 'Exchange', amount: 0.15, date: '2024-10-03' },
        { id: 4, type: 'Transfer', from: 'User A', to: 'User B', amount: 0.1, date: '2024-10-04' },
    ];

    return (
        <>
            <NavBar /> {/* Include the NavBar */}
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="80vh"
                sx={{ backgroundColor: '#f5f5f5', padding: 2 }} // Light background color with padding
            >
                <Typography variant="h4" gutterBottom>
                    History for {user ? user.username : 'Guest'}
                </Typography>

                {/* Table for displaying history */}
                <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Amount (BTC)</TableCell> {/* Updated label to indicate Bitcoin */}
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
                                    <TableCell>{row.amount} BTC</TableCell> {/* Displaying the amount with 'BTC' */}
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

export default HistoryPage;