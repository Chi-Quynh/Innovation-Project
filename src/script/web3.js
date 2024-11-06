// src/script/web3.js
import Web3 from "web3";

// Connect Web3 directly to Ganache's HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

export default web3;

/* META MASK
// src/script/web3.js
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
  // MetaMask or modern DApp browser
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error("User denied account access");
  }
} else {
  // Fallback to Ganache for local testing
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}

export default web3; */
