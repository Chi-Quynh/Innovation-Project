import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import TradingPage from "./components/TradingPage";
import HistoryPage from "./components/HistoryPage";
import "./asset/style.css";

const App = () => {
  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/trading" element={<TradingPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </AuthProvider>
    </Router>
);
};

export default App;