const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const bs58 = require("bs58");

async function generateKeypair() {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
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
		console.log(error);
		return { success: false };
	}
}

generateKeypair();
module.exports = { generateKeypair };
