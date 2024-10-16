import { useAuth } from '../contexts/AuthContextMain';

const DashBoardMain = () => {
	const { isAuthenticated, logout } = useAuth();

	if (!isAuthenticated) {
		window.location.href = '/login';
		return null;
	}

	return (
		<div>
			<h1>DashBoardMain</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default DashBoardMain;
