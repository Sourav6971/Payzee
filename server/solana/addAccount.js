const bs58 = require("bs58");
const { Keypair } = require("@solana/web3.js");

async function addAccount(privateKey) {
  const keypair = await Keypair.fromSecretKey(bs58.default.decode(privateKey));
  const publicAddress = keypair.publicKey.toBase58();
  return publicAddress;
}
module.exports = { addAccount };
