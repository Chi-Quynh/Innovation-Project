// src/script/simpleStorage.js
import web3 from "./web3";
import SimpleStorage from "../build/contracts/SimpleStorage.json";

const privateKey = ""; // Replace with an actual private key from Ganache

// Add account to Web3 wallet
const account = web3.eth.accounts.wallet.add(privateKey);
export const userAddress = account.address; // Use this for transactions

// Initialize the smart contract
const contractAddress = "0xEcDCAf6205033597EA83303DD6694365b298D6cF"; // Replace with your deployed contract address from Ganache
const simpleStorage = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export default simpleStorage;
