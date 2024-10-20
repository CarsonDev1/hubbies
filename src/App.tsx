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
import LandingPage from './pages/LandingPage';
import Cart from './pages/Detail';
import EventHostRegister from './pages/EventHostRegister';
import TicketPost from './pages/TicketPost';
import CategoryEvent from './pages/CategoryEvent';
import FeedBack from './pages/FeedBack';
import DashBoardMain from './pages/DashBoardMain';
import LoginComponent from './pages/LoginComponent';
import { AuthProvider, useAuth } from './contexts/AuthContextMain';
import CartPayment from './pages/CartPayment';
import ViewOrder from './pages/ViewOrder';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		window.location.href = '/login';
		return null;
	}

	return <>{children}</>;
};

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('/dashboard');

	return (
		<Router>
			<Routes>
				<Route path='/landing-page' element={<LandingPage />} />
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
					path='/register?role=Eventhost'
					element={
						<LoginLayout>
							<EventHostRegister />
						</LoginLayout>
					}
				/>
				<Route
					path='/login?role=Eventhost'
					element={
						<LoginLayout>
							<EventHostRegister />
						</LoginLayout>
					}
				/>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<>
								<RootLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<Home />
								</RootLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/cart/:ticketId'
					element={
						<>
							<RootLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Cart />
							</RootLayout>
							<Footer />
						</>
					}
				/>
				<Route
					path='/cart-payment'
					element={
						<>
							<RootLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<CartPayment />
							</RootLayout>
							<Footer />
						</>
					}
				/>
				<Route
					path='/dashboard/users'
					element={
						<ProtectedRoute>
							<>
								<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<UserManagement />
								</AdminLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/dashboard/tickets'
					element={
						<ProtectedRoute>
							<>
								<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<TicketPost />
								</AdminLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/dashboard/category'
					element={
						<ProtectedRoute>
							<>
								<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<CategoryEvent />
								</AdminLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/dashboard/feedback'
					element={
						<ProtectedRoute>
							<>
								<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<FeedBack />
								</AdminLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/dashboard/order'
					element={
						<ProtectedRoute>
							<>
								<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
									<ViewOrder />
								</AdminLayout>
								<Footer />
							</>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Dashboard />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/login-main'
					element={
						<AuthProvider>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<LoginComponent />
							</AdminLayout>
						</AuthProvider>
					}
				/>
				<Route
					path='/dashboard-main'
					element={
						<AuthProvider>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<DashBoardMain />
							</AdminLayout>
						</AuthProvider>
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
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<UserManagement />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/posts'
					element={
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Posts />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/your-profile'
					element={
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Profile />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/notifications'
					element={
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Notifications />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/setting'
					element={
						<ProtectedRoute>
							<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
								<Customization />
							</AdminLayout>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
