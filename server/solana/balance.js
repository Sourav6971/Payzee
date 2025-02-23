const { Keypair, Connection, clusterApiUrl } = require("@solana/web3.js");
const bs58 = require("bs58");

async function balance(privateKey) {
  const connection = new Connection(clusterApiUrl("devnet"));
  const senderKeyPair = Keypair.fromSecretKey(bs58.default.decode(privateKey));
  const balance = await connection.getBalance(senderKeyPair.publicKey);
  console.log(balance);
}

balance(
  "3rHH4q2fPQ1yLHPBmgV8g6CEheUSxu66oWr279e2awgd6FMifW2KP5qazvxpEinufpKogV94N26gWP54ZhDHgLaY"
);

module.exports = { balance };
