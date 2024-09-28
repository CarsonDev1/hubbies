import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginLayoutProps {
	children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
	return (
		<div className='flex items-center justify-center h-full bg-[rgb(255,254,230)]'>
			<div className='w-full'>
				{children}
				<ToastContainer />
			</div>
		</div>
	);
};

export default LoginLayout;
