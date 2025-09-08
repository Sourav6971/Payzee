const {
	Connection,
	clusterApiUrl,
	Keypair,
	PublicKey,
} = require("@solana/web3.js");
const bs58 = require("bs58");
const { SOLANA_CLUSTER } = require("../../config");

/**
 * Generate a new Solana keypair
 * @returns {Promise<Object>} Keypair generation result
 */
async function generateKeypair() {
	try {
		const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER), "confirmed");
		const keypair = Keypair.generate();
		const privateKeyBase58 = bs58.default.encode(keypair.secretKey);
		return {
			success: true,
			data: {
				publicKey: keypair.publicKey.toBase58(),
				secretKey: privateKeyBase58,
			},
		};
	} catch (error) {
		console.error("Error generating keypair:", error);
		return { success: false };
	}
}

/**
 * Verify a Solana public key
 * @param {string} publicKey - Public key to verify
 * @returns {Promise<boolean>} Whether the public key is valid
 */
async function verifyPublicKey(publicKey) {
	try {
		// Check if the public key is valid
		new PublicKey(publicKey);
		// Verify it's on the curve
		return PublicKey.isOnCurve(new PublicKey(publicKey).toBytes());
	} catch (error) {
		console.error("Error verifying public key:", error);
		return false;
	}
}

module.exports = { 
	generateKeypair, 
	verifyPublicKey 
};