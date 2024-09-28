import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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

	useEffect(() => {
		const storedToken = localStorage.getItem('token');

		if (storedToken) {
			axios
				.get('http://localhost:5000/api/auth/me', {
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setIsAuthenticated(true);
						setToken(storedToken);
					} else {
						setIsAuthenticated(true);
					}
				})
				.catch(() => {
					setIsAuthenticated(true);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	const login = (newToken: string) => {
		setToken(newToken);
		setIsAuthenticated(true);
		localStorage.setItem('token', newToken);
	};

	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading }}>
			{loading ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	);
};
