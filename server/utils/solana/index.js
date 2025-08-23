const {
  PublicKey,
  Keypair,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");
const bs58 = require("bs58");

async function addAccount(privateKey) {
  const keypair = await Keypair.fromSecretKey(bs58.default.decode(privateKey));
  const publicAddress = keypair.publicKey.toBase58();
  return publicAddress;
}

async function balanceCheck(userPublicKey) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const balance = await connection.getBalance(new PublicKey(userPublicKey));

  return balance;
}

async function createAccount() {
  const keypair = await Keypair.generate();

  const publicKeyString = keypair.publicKey.toBase58();

  const secretKeyString = Buffer.from(keypair.secretKey).toString("base64");

  //   console.log("Public Key:", publicKeyString);
  //   console.log("Secret Key:", secretKeyString);

  return { publicKeyString, secretKeyString };
}

async function transaction(fromAddress, toAddress, amount) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const recipientPublicKey = new PublicKey(toAddress);
  const senderKeyPair = Keypair.fromSecretKey(bs58.default.decode(fromAddress));
  amountInLamports = amount * LAMPORTS_PER_SOL;
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      toPubkey: recipientPublicKey,
      fromPubkey: senderKeyPair.publicKey,
      lamports: amountInLamports,
    })
  );
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeyPair,
  ]);

  return signature;
}

async function transactionHistory(address) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const pubKey = new PublicKey(address);
  const transactions = await connection.getSignaturesForAddress(pubKey, {
    limit: 5,
  });
  return transactions;
}

module.exports = {
  transaction,
  addAccount,
  balanceCheck,
  createAccount,
  transactionHistory,
};
