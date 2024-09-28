import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout';
import AdminLayout from './layout/AdminLayout';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import BookLoader from './components/BookLoader/BookLoader';

const Dashboard = React.lazy(() => import('./pages/DashBoard'));
const CreatePostModal = React.lazy(() => import('./components/CreatePostModal/CreatePostModal'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const Posts = React.lazy(() => import('./pages/Post'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Customization = React.lazy(() => import('./pages/Customization'));

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);
	const [delayed, setDelayed] = useState<boolean>(true);

	useEffect(() => {
		const timer = setTimeout(() => setDelayed(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	if (loading || delayed) {
		return <BookLoader />;
	}

	return isAuthenticated ? element : <Navigate to='/login' />;
};

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('dashboard');
	const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
	const [selectedTemplate, setSelectedTemplate] = useState<string>('');
	const [postContent, setPostContent] = useState<string>('');

	return (
		<AuthProvider>
			<Router>
				<Suspense fallback={<BookLoader />}>
					<Routes>
						<Route
							path='/login'
							element={
								<LoginLayout>
									<Login />
								</LoginLayout>
							}
						/>
						<Route
							path='/register'
							element={
								<LoginLayout>
									<Register />
								</LoginLayout>
							}
						/>
						<Route path='/' element={<Navigate to='/dashboard' />} />
						<Route
							path='/dashboard'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<Dashboard />
										</AdminLayout>
									}
								/>
							}
						/>
						<Route
							path='/users'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<UserManagement />
										</AdminLayout>
									}
								/>
							}
						/>
						<Route
							path='/posts'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<Posts />
										</AdminLayout>
									}
								/>
							}
						/>
						<Route
							path='/analytics'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<Analytics />
										</AdminLayout>
									}
								/>
							}
						/>
						<Route
							path='/notifications'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<Notifications />
										</AdminLayout>
									}
								/>
							}
						/>
						<Route
							path='/customization'
							element={
								<ProtectedRoute
									element={
										<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
											<Customization />
										</AdminLayout>
									}
								/>
							}
						/>
					</Routes>
					{showCreatePost && (
						<Suspense fallback={<BookLoader />}>
							<CreatePostModal
								showCreatePost={showCreatePost}
								setShowCreatePost={setShowCreatePost}
								postContent={postContent}
								setPostContent={setPostContent}
								selectedTemplate={selectedTemplate}
								setSelectedTemplate={setSelectedTemplate}
							/>
						</Suspense>
					)}
				</Suspense>
			</Router>
		</AuthProvider>
	);
};

export default App;
