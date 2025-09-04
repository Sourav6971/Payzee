const {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

// Initialize connection to Solana cluster
const SOLANA_CLUSTER = process.env.SOLANA_CLUSTER || 'devnet';
const connection = new Connection(`https://api.${SOLANA_CLUSTER}.solana.com`, 'confirmed');

/**
 * Create a new Solana account for a payment
 * @returns {Object} Keypair of the new account
 */
function createPaymentAccount() {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  };
}

/**
 * Check if a payment has been received to an account
 * @param {string} accountPublicKey - Public key of the account to check
 * @param {number} expectedAmount - Expected amount in SOL
 * @returns {Object} Payment status and details
 */
async function checkPaymentReceived(accountPublicKey, expectedAmount) {
  try {
    const publicKey = new PublicKey(accountPublicKey);
    const balance = await connection.getBalance(publicKey);
    const balanceInSOL = balance / LAMPORTS_PER_SOL;
    
    console.log(`Balance for account ${accountPublicKey}: ${balanceInSOL} SOL`);
    
    // Check if balance meets or exceeds expected amount
    if (balanceInSOL >= expectedAmount) {
      return {
        received: true,
        amount: balanceInSOL,
        sufficient: balanceInSOL >= expectedAmount,
      };
    }
    
    return {
      received: false,
      amount: balanceInSOL,
      sufficient: false,
    };
  } catch (error) {
    console.error('Error checking payment:', error);
    throw error;
  }
}

/**
 * Transfer SOL from one account to another
 * @param {Array<number>} fromSecretKey - Secret key of the sender account
 * @param {string} toPublicKey - Public key of the recipient account
 * @param {number} amount - Amount in SOL to transfer
 * @returns {string} Transaction signature
 */
async function transferSol(fromSecretKey, toPublicKey, amount) {
  try {
    const fromKeypair = Keypair.fromSecretKey(new Uint8Array(fromSecretKey));
    const toPubkey = new PublicKey(toPublicKey);
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    
    const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    return signature;
  } catch (error) {
    console.error('Error transferring SOL:', error);
    throw error;
  }
}

/**
 * Get account info
 * @param {string} publicKey - Public key of the account
 * @returns {Object} Account information
 */
async function getAccountInfo(publicKey) {
  try {
    const pubkey = new PublicKey(publicKey);
    const accountInfo = await connection.getAccountInfo(pubkey);
    return accountInfo;
  } catch (error) {
    console.error('Error getting account info:', error);
    throw error;
  }
}

module.exports = {
  createPaymentAccount,
  checkPaymentReceived,
  transferSol,
  getAccountInfo,
  connection,
};