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

module.exports = { transaction };
