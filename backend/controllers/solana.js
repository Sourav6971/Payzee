const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");
const { SOLANA_CLUSTER } = require("../config");

const { updateTransaction } = require("../utils/transaction");

async function confirmTransaction(publicKey, transactionId) {
	let attempts = 0;
	const maxAttempts = 30; // 5 minutes max (10 seconds * 30)
	
	const paymentVerification = setInterval(async () => {
		try {
			if (attempts >= maxAttempts) {
				console.error("Transaction verification timed out for publicKey:", publicKey);
				clearInterval(paymentVerification);
				return;
			}
			
			attempts++;
			
			const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER), "confirmed");
			let signatures = await connection.getSignaturesForAddress(
				new PublicKey(publicKey),
				{ limit: 5 } // Check more than 1 to be safe
			);

			if (signatures.length === 0) {
				console.log("No signatures found yet for publicKey:", publicKey);
				return;
			}

			// Check all recent signatures
			for (let i = 0; i < signatures.length; i++) {
				let signature = signatures[i];
				let status = signature["confirmationStatus"];
				
				console.log(`Signature ${signature.signature} status:`, status);

				if (status === "finalized") {
					// Get transaction details
					const transactionDetails = await connection.getParsedTransaction(
						signature.signature
					);
					
					// Update transaction in database with txId
					const updateResult = await updateTransaction(publicKey, signature.signature);
					if (updateResult.success) {
						console.log("Transaction confirmed and updated successfully for publicKey:", publicKey);
						clearInterval(paymentVerification);
						return;
					}
				}
			}
		} catch (error) {
			console.error("Error in transaction verification:", error);
			// Don't clear interval on error, continue trying until max attempts
		}
	}, 10000); // Check every 10 seconds
	
	// Return the interval ID so it can be cleared externally if needed
	return paymentVerification;
}

module.exports = { confirmTransaction };
