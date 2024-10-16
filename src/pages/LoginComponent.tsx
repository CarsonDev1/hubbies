import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContextMain';
import api from '../utils/api';

const LoginComponent = () => {
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const response = await api.post('/auths/login', { email, password });
			const { accessToken, refreshToken } = response.data;
			login({ accessToken, refreshToken });
		} catch (error) {
			console.error('Đăng nhập thất bại', error);
		}
	};

	return (
		<div>
			<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default LoginComponent;
