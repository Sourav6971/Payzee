import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = React.lazy(() => import("./pages/Landing"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const NotFound = React.lazy(() => import("./pages/404"));
const Docs = React.lazy(() => import("./pages/Docs"));
const SideMenu = React.lazy(() => import("./pages/SideBar/Index"));
const Transfer = React.lazy(() => import("./components/Transfer"));

import Authenticate from "./utils/authenticateWrapper";
import ApiContextProvider from "./context/api";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/user";
import Fallback from "./components/Fallback";

const ROUTES = [
	{ path: "/", element: <Landing />, authenticated: false },
	{ path: "/home", element: <Landing />, authenticated: false },
	{
		path: "/auth",
		element: <Auth />,
		authenticated: false,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		authenticated: true,
	},
	{
		path: "/dashboard/options",
		element: <SideMenu />,
		authenticated: true,
	},
	{
		path: "/docs",
		element: <Docs />,
		authenticated: false,
	},
	{
		path: "/transfer",
		element: <Transfer />,
		authenticated: false,
	},

	{
		path: "/*",
		element: <NotFound />,
		authenticated: false,
	},
];

function App() {
	return (
		<ApiContextProvider>
			<UserContextProvider>
				<Toaster />
				<Suspense fallback={<Fallback />}>
					<Routes>
						{ROUTES.map(({ path, element, authenticated }) => (
							<Route
								key={path}
								path={path}
								element={
									authenticated ? (
										<Authenticate>{element}</Authenticate>
									) : (
										element
									)
								}
							/>
						))}
					</Routes>
				</Suspense>
			</UserContextProvider>
		</ApiContextProvider>
	);
}

export default App;
