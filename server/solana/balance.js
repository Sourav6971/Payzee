const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");

const bs58 = require("bs58");

async function balanceCheck(userPublicKey) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const balance = await connection.getBalance(new PublicKey(userPublicKey));

  return balance;
}

module.exports = { balanceCheck };
