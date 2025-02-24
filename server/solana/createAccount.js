const { Keypair } = require("@solana/web3.js");

async function createAccount() {
  const keypair = await Keypair.generate();

  const publicKeyString = keypair.publicKey.toBase58();

  const secretKeyString = Buffer.from(keypair.secretKey).toString("base64");

  //   console.log("Public Key:", publicKeyString);
  //   console.log("Secret Key:", secretKeyString);

  return { publicKeyString, secretKeyString };
}

module.exports = { createAccount };
