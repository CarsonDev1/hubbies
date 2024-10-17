import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
	userName: string;
	id: string;
	email: string;
}

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	login: (tokens: { accessToken: string; refreshToken: string }) => void;
	logout: () => void;
	fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken'));
	const [user, setUser] = useState<User | null>(null);

	const login = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		setIsAuthenticated(true);
		fetchUserData();
	};

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setIsAuthenticated(false);
		setUser(null);
	};

	const refreshAccessToken = async (): Promise<string | null> => {
		try {
			const expiredToken = localStorage.getItem('accessToken');
			const refreshToken = localStorage.getItem('refreshToken');

			if (!expiredToken || !refreshToken) return null;

			const response = await axios.post('https://hubbies-be.azurewebsites.net/api/auths/refresh-token', {
				expiredToken,
				refreshToken,
			});

			const { accessToken, refreshToken: newRefreshToken } = response.data;
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', newRefreshToken);

			return accessToken;
		} catch (error) {
			console.error('Error refreshing token:', error);
			logout();
			return null;
		}
	};

	const fetchUserData = async (): Promise<void> => {
		try {
			let accessToken = localStorage.getItem('accessToken');
			if (!accessToken) return;

			try {
				const response = await axios.get('https://hubbies-be.azurewebsites.net/api/accounts', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setUser(response.data);
			} catch (error: any) {
				if (error.response && error.response.status === 401) {
					accessToken = await refreshAccessToken();
					if (accessToken) {
						const response = await axios.get('https://hubbies-be.azurewebsites.net/api/accounts', {
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						});
						setUser(response.data);
					}
				} else {
					console.error('Error fetching user data:', error);
				}
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserData }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
