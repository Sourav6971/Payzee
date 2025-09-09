import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function Wallet({ children }) {
	const { connected, loading, connectWallet } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!connected || loading) {
			navigate('/dashboard');
			toast.error('Please connect wallet!');
		}
	}, [connected, loading, navigate]);

	return connected ? children : null;
}

Wallet.propTypes = {
	children: PropTypes.node.isRequired,
};
