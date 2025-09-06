const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");

async function confirmTransaction(publicKey) {
	const paymentVerification = setInterval(async () => {
		try {
			const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
			let signatures = await connection.getSignaturesForAddress(
				new PublicKey(publicKey),
				{ limit: 1 }
			);

			if (signatures.length === 0) {
				throw new Error("Not found");
			}

			let concernedSignature = signatures[0]["signature"];
			let status = signatures[0]["confirmationStatus"];
			console.log(status);

			const transactionDetails = await connection.getParsedTransaction(
				concernedSignature
			);
			if (
				status === "finalized" &&
				JSON.stringify(transactionDetails).includes(publicKey)
			) {
				await updateTransaction(publicKey);
				clearInterval(paymentVerification);
			}
		} catch (error) {
			console.error(error);
		}
	}, 10000);
}

confirmTransaction("CENSaA71kpbgfMcLp9SEeMTJ9nF5N7dxoSG65jP1WnA");
