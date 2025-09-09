import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fallback from '../shared/components/Fallback';
import SidebarIndex from '../features/sidebar/Index';

export default function SidebarRoutes() {
	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="/dashboard/options" element={<SidebarIndex />} />
			</Routes>
		</Suspense>
	);
}
