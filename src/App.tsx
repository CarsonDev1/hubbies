import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout';
import AdminLayout from './layout/AdminLayout';
import FormAuth from './pages/FormAuth';
import ForgotPassword from './pages/ForgotPassword';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';

import Dashboard from './pages/DashBoard';
import UserManagement from './pages/UserManagement';
import Posts from './pages/Post';
import Notifications from './pages/Notifications';
import Customization from './pages/Customization';
import Profile from './pages/Profile';

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('/dashboard');

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
						<>
							<RootLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Home />
							</RootLayout>
							<Footer />
						</>
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
					path='/your-profile'
					element={
						<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
							<Profile />
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
					path='/setting'
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
