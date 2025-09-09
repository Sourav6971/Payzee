import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from './context';
import toast from 'react-hot-toast';
import {
	clusterApiUrl,
	Connection,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from '@solana/web3.js';
import { ApiContext } from '../api/context';
import PropTypes from 'prop-types';

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const { makeApiRequest } = useContext(ApiContext);
	const [connected, setConnected] = useState(false);
	const [wallet, setWallet] = useState(null);

	const disconnectWallet = useCallback(async () => {
		await window?.solana?.disconnect();
		setConnected(false);
		setWallet(null);
	}, []);

	const connectWallet = useCallback(async () => {
		const response = await window?.solana?.connect();
		if (response) {
			setWallet(await response.publicKey.toBase58());
			setConnected(true);
		} else toast.error('Could not find wallet');
		console.error(response);
	}, []);

	const paySol = useCallback(
		async (amount, toAddress, fromAddress = wallet) => {
			try {
				const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
				const transaction = new Transaction().add(
					SystemProgram.transfer({
						fromPubkey: new PublicKey(fromAddress),
						toPubkey: new PublicKey(toAddress),
						lamports: amount * LAMPORTS_PER_SOL,
					})
				);
				transaction.feePayer = new PublicKey(fromAddress);

				transaction.recentBlockhash = (
					await connection.getRecentBlockhash()
				).blockhash;
				const signedTransaction =
					await window?.solana?.signTransaction(transaction);
				const txid = await connection.sendRawTransaction(
					signedTransaction.serialize()
				);
				if (txid) toast.success('Transaction successfull');
				else throw new Error('Transaction could not be confirmed!');
			} catch (error) {
				console.error(error);
				toast.error('Transaction failed, try again!');
			}
		},
		[wallet]
	);

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			connectWallet,
			disconnectWallet,
			connected,
			wallet,
			paySol,
		}),
		[user, connected, connectWallet, disconnectWallet, wallet, paySol]
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}

UserContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
