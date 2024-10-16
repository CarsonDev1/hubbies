import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import axiosInstance from '../utils/axiosIntance';

interface AuthContextType {
	isAuthenticated: boolean;
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	token: null,
	loading: true,
	login: () => {},
	logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const checkToken = () => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			axios
				.get('https://hubbies-be.azurewebsites.net/api/accounts', {
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setIsAuthenticated(true);
						setToken(storedToken);
					} else {
						setIsAuthenticated(false);
					}
				})
				.catch((error) => {
					console.error('Error verifying token:', error.response || error.message);
					setIsAuthenticated(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
			setIsAuthenticated(false);
		}
	};

	const refreshAuthToken = () => {
		const refreshToken = localStorage.getItem('refreshToken');
		const expiredToken = token;

		if (refreshToken && expiredToken) {
			axiosInstance
				.post('/auths/refresh-token', {
					expiredToken,
					refreshToken,
				})
				.then((response) => {
					const newToken = response.data.accessToken;
					if (newToken) {
						localStorage.setItem('token', newToken);
						setToken(newToken);
						setIsAuthenticated(true);
					} else {
						console.error('No new token returned');
					}
				})
				.catch((error) => {
					console.error('Failed to refresh token:', error.response?.data || error.message);
					setIsAuthenticated(false);
					logout();
				});
		} else {
			console.error('No refresh token or expired token found');
			logout();
		}
	};

	useEffect(() => {
		checkToken();

		const intervalId = setInterval(() => {
			refreshAuthToken();
		}, 45 * 60 * 1000);

		return () => clearInterval(intervalId);
	}, []);

	const login = (newToken: string) => {
		setToken(newToken);
		setIsAuthenticated(true);
		localStorage.setItem('token', newToken);
		checkToken();
	};

	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		checkToken();
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading }}>
			{loading ? <LoadingSpinner /> : children}
		</AuthContext.Provider>
	);
};
