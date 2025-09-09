import { Suspense } from 'react';
import AppRoutes from './routes';
import ApiContextProvider from './context/api';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/user';
import Fallback from './shared/components/Fallback';

function App() {
	return (
		<ApiContextProvider>
			<UserContextProvider>
				<Toaster />
				<Suspense fallback={<Fallback />}>
					<AppRoutes />
				</Suspense>
			</UserContextProvider>
		</ApiContextProvider>
	);
}

export default App;
