import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fallback from '../shared/components/Fallback';

// Lazy load public components
const LandingPage = lazy(() => import('../features/landing/LandingPage'));
const AuthPage = lazy(() => import('../features/auth/AuthPage'));
const DocsPage = lazy(() => import('../features/DocsPage'));
const NotFoundPage = lazy(() => import('../features/NotFoundPage'));
const TransferPage = lazy(() => import('../features/transfer/TransferPage'));
const PrivacyPolicy = lazy(() => import('../features/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../features/TermsOfService'));

export default function PublicRoutes() {
	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<LandingPage />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/docs" element={<DocsPage />} />
				<Route path="/transfer" element={<TransferPage />} />
				<Route path="/privacy" element={<PrivacyPolicy />} />
				<Route path="/terms" element={<TermsOfService />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
}
