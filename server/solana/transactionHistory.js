const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");

async function transactionHistory(address) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const pubKey = new PublicKey(address);
  const transactions = await connection.getSignaturesForAddress(pubKey, {
    limit: 5,
  });
  return transactions;
}

module.exports = { transactionHistory };
