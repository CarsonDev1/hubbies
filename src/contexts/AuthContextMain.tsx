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
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
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

	const fetchUserData = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) return;

			const response = await axios.get('https://hubbies-be.azurewebsites.net/api/accounts', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setUser(response.data);
		} catch (error) {
			console.error('Error fetching user data:', error);
			// Xử lý lỗi khi fetch user data, ví dụ: hết hạn token
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserData }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
