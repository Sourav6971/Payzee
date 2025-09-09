import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../shared/layout/Footer';
import Navbar from '../shared/components/ui/Navbar';
import { UserContext } from '../context/user/context';
import DashboardNavigation from '../shared/navigation/DashboardNavigation';
import toast from 'react-hot-toast';

export default function DashboardLayout() {
	const { connectWallet, disconnectWallet, connected, wallet } =
		useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		// Removed auto-connect to let users manually connect
	}, []);

	const handleWalletAction = async () => {
		if (connected) {
			await disconnectWallet();
			toast.success('Wallet disconnected successfully');
		} else {
			try {
				await connectWallet();
				toast.success('Wallet connected successfully');
			} catch (error) {
				toast.error('Failed to connect wallet: ' + error.message);
			}
		}
	};

	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar
					title={
						<div
							className="text-blue-900 flex flex-col justify-center cursor-pointer"
							onClick={() => navigate('/dashboard')}
						>
							<span className="text-2xl ml-3 font-semibold">Dashboard</span>
						</div>
					}
					options={[{ name: 'Docs', action: () => navigate('/docs') }]}
					button={connected ? 'Disconnect wallet' : 'Connect Wallet'}
					buttonOnClick={handleWalletAction}
				/>
				<div className="flex flex-1">
					<DashboardNavigation />
					<main className="flex-1 pt-6 pb-16 px-4 sm:px-6 lg:px-8">
						<Outlet />
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
