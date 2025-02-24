const { Keypair } = require("@solana/web3.js");

async function createAccount() {
  const keypair = await Keypair.generate();

  // Convert the public key to a base58 string
  const publicKeyString = keypair.publicKey.toBase58();

  // Convert the secret key to a base64 string using Buffer
  const secretKeyString = Buffer.from(keypair.secretKey).toString("base64");

  //   console.log("Public Key:", publicKeyString);
  //   console.log("Secret Key:", secretKeyString);
  return { publicKeyString, secretKeyString };
}

module.exports = { createAccount };
