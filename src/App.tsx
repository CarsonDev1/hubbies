import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout';
import AdminLayout from './layout/AdminLayout';
import FormAuth from './pages/FormAuth';
import ForgotPassword from './pages/ForgotPassword';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';

const Dashboard = React.lazy(() => import('./pages/DashBoard'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const Posts = React.lazy(() => import('./pages/Post'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Customization = React.lazy(() => import('./pages/Customization'));

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('dashboard');

	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={
						<LoginLayout>
							<FormAuth />
						</LoginLayout>
					}
				/>
				<Route
					path='/register'
					element={
						<LoginLayout>
							<FormAuth />
						</LoginLayout>
					}
				/>
				<Route
					path='/'
					element={
						<RootLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Home />
						</RootLayout>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Dashboard />
						</AdminLayout>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<LoginLayout>
							<ForgotPassword />
						</LoginLayout>
					}
				/>
				<Route
					path='/users'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<UserManagement />
						</AdminLayout>
					}
				/>
				<Route
					path='/posts'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Posts />
						</AdminLayout>
					}
				/>
				<Route
					path='/analytics'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Analytics />
						</AdminLayout>
					}
				/>
				<Route
					path='/notifications'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Notifications />
						</AdminLayout>
					}
				/>
				<Route
					path='/customization'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Customization />
						</AdminLayout>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
