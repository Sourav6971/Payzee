import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fallback from '../shared/components/Fallback';
import Authenticate from '../shared/auth';

// Route components
import PublicRoutes from './PublicRoutes';
import DashboardRoutes from './DashboardRoutes';
import SidebarRoutes from './SidebarRoutes';

export default function AppRoutes() {
	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="/*" element={<PublicRoutes />} />
				<Route
					path="/dashboard/*"
					element={
						<Authenticate>
							<DashboardRoutes />
						</Authenticate>
					}
				/>
				<Route
					path="/dashboard/options/*"
					element={
						<Authenticate>
							<SidebarRoutes />
						</Authenticate>
					}
				/>
			</Routes>
		</Suspense>
	);
}
