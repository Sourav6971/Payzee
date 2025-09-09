import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fallback from '../shared/components/Fallback';
import DashboardLayout from '../layouts/DashboardLayout';

// Lazy load dashboard components
const DashboardOverview = lazy(() => import('../features/dashboard/Index'));
const DashboardProjects = lazy(() => import('../features/dashboard/Projects'));
const DashboardApiKeys = lazy(() => import('../features/dashboard/ApiKeys'));
const DashboardTransactions = lazy(
	() => import('../features/dashboard/Transactions')
);
const DashboardAnalytics = lazy(
	() => import('../features/dashboard/Analytics')
);

export default function DashboardRoutes() {
	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="/" element={<DashboardLayout />}>
					<Route index element={<DashboardOverview />} />
					<Route path="projects" element={<DashboardProjects />} />
					<Route path="api-keys" element={<DashboardApiKeys />} />
					<Route path="transactions" element={<DashboardTransactions />} />
					<Route path="analytics" element={<DashboardAnalytics />} />
				</Route>
			</Routes>
		</Suspense>
	);
}
