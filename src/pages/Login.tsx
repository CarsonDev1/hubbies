import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(location.pathname === '/login');

	useEffect(() => {
		setIsLogin(location.pathname === '/login');
	}, [location]);

	const toggleForm = () => {
		if (isLogin) {
			navigate('/register');
		} else {
			navigate('/login');
		}
	};

	return (
		<div className='flex justify-between h-dvh bg-[#fffee6] p-12'>
			<div className='flex flex-col w-1/2 gap-12'>
				<img src='/' alt='logo' className='h-16 w-28' />
				<div className='flex flex-col'>
					<div className='text-center'>
						<h2 className='text-7xl font-extrabold text-[#000]'>
							WELCOME TO <br /> HUBBIES!
						</h2>
					</div>

					<div className='relative flex w-2/5 p-2 mx-auto mt-4 mb-16 border rounded-full bg-primary-color border-button-color'>
						<div className='relative flex w-full'>
							<div
								className={`absolute top-0 bottom-0 left-0 w-1/2 h-full bg-button-color rounded-full transition-transform duration-300 ease-in-out ${
									!isLogin ? 'transform translate-x-full' : ''
								}`}
							></div>

							<button
								onClick={() => navigate('/login')}
								className={`w-1/2 py-3 text-center text-base font-normal relative z-10 transition-all duration-300 ease-in-out ${
									isLogin ? 'text-white' : 'text-button-color'
								}`}
							>
								Login
							</button>

							<button
								onClick={() => navigate('/register')}
								className={`w-1/2 py-3 text-center text-base font-normal relative z-10 transition-all duration-300 ease-in-out ${
									!isLogin ? 'text-white' : 'text-button-color'
								}`}
							>
								Register
							</button>
						</div>
					</div>

					<form onSubmit={() => {}} className='w-2/3 mx-auto space-y-6' autoComplete='off'>
						<div>
							<label htmlFor='email' className='block mb-1 text-sm font-medium text-button-color'>
								Username
							</label>
							<input
								id='email'
								type='email'
								className='w-full px-4 py-3 bg-transparent border rounded-lg border-button-color focus:outline-none focus:ring-0'
								placeholder='Enter your email'
								autoComplete='off'
							/>
						</div>

						<div>
							<label htmlFor='password' className='block mb-1 text-sm font-medium text-button-color'>
								Password
							</label>
							<input
								id='password'
								type='password'
								className='w-full px-4 py-3 bg-transparent border rounded-lg border-button-color focus:outline-none focus:ring-0'
								placeholder='Enter your password'
								autoComplete='new-password'
							/>
						</div>

						{!isLogin && (
							<div>
								<label
									htmlFor='confirm-password'
									className='block mb-1 text-sm font-medium text-gray-700'
								>
									Confirm Password
								</label>
								<input
									id='confirm-password'
									type='password'
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0'
									placeholder='Confirm your password'
									autoComplete='new-password'
								/>
							</div>
						)}

						<div>
							<button
								type='submit'
								className='flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
							>
								{isLogin ? 'Sign In' : 'Register'}
							</button>
						</div>
					</form>

					{isLogin ? (
						<p className='mt-8 text-sm text-center text-gray-600'>
							Don't have an account?{' '}
							<button onClick={toggleForm} className='font-medium text-blue-600 hover:text-blue-500'>
								Sign Up Now
							</button>
						</p>
					) : (
						<p className='mt-8 text-sm text-center text-gray-600'>
							Already have an account?{' '}
							<button onClick={toggleForm} className='font-medium text-blue-600 hover:text-blue-500'>
								Sign In
							</button>
						</p>
					)}
				</div>
			</div>

			<div className='w-1/2 h-full'>
				<img
					src='/public/images/form-image.png'
					alt='form-image'
					className='object-cover w-full h-full rounded-2xl'
				/>
			</div>
		</div>
	);
};

export default LoginPage;
