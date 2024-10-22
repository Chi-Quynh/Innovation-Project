let EC = require("elliptic").ec,
  fs = require("fs");

const ec = new EC("secp256k1"), //create new private key
  privateKeyLocation = __dirname + "/wallet/private_key"; //priv key saved on hardware

exports.initWallet = () => {
  let privateKey;
  if (fs.existsSync(privateKeyLocation)) {
    const buffer = fs.readFileSync(privateKeyLocation, "utf8");
    privateKey = buffer.toString();
  } else {
    privateKey = generatePrivateKey();
    fs.writeFileSync(privateKeyLocation, privateKey);
  }

  const key = ec.keyFromPrivate(privateKey, "hex");
  const publicKey = key.getPublic().encode("hex");
  return { privateKeyLocation: privateKeyLocation, publicKey: publicKey };
};

const generatePrivateKey = () => {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate();
  return privateKey.toString(16);
};

//test working
let wallet = this;
let reVal = wallet.initWallet();
console.log(JSON.stringify(reVal));
