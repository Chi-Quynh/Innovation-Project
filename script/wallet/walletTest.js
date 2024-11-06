const wallet = require("../wallet");

// Test initializing the wallet
const walletInfo = wallet.initWallet();
console.log("Wallet Info:", walletInfo);

// Test verifying the private key
const privateKey = walletInfo.privateKeyLocation;
const fs = require("fs");
const privateKeyData = fs.readFileSync(privateKey, "utf8");

console.log("Testing valid private key...");
console.log("Verification Result:", wallet.verifyPrivateKey(privateKeyData));

// Test with an invalid private key
const invalidPrivateKey = "123abc";
console.log("Testing invalid private key...");
console.log("Verification Result:", wallet.verifyPrivateKey(invalidPrivateKey));
