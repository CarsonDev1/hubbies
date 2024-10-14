/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import FormImage from '../assets/images/form-image.png';
import axiosInstance from '../utils/axiosIntance';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBody, LoginBodyType, RegisterBody, RegisterBodyType } from '../schemaValidations/auth.schema';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const FormAuth: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(location.pathname === '/login');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsLogin(location.pathname === '/login');
	}, [location]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterBodyType | LoginBodyType>({
		resolver: zodResolver(isLogin ? LoginBody : RegisterBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: RegisterBodyType | LoginBodyType) => {
		setLoading(true);

		try {
			if (!isLogin) {
				const response = await axiosInstance.post('/auths/register', data);
				if (response.status === 200) {
					navigate('/login');
					toast.success('Registration successful!');
				}
			} else {
				const response = await axiosInstance.post('/auths/login', data);
				if (response.status === 200) {
					localStorage.setItem('token', response.data.accessToken);
					const { accessToken } = response.data;
					const decoded: any = jwtDecode(accessToken);
					if (decoded?.role === 'EventHost') {
						navigate('/');
					} else {
						navigate('/dashboard');
					}
					toast.success('Login successful!');
					window.location.reload();
				}
			}
		} catch (error: any) {
			if (error.response?.status === 409) {
				toast.error('Email is already registered. Please try another email.');
			} else {
				toast.error(error.response?.data?.message || (isLogin ? 'Login failed.' : 'Registration failed.'));
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative flex-col justify-between min-h-screen p-3 md:flex md:flex-row md:p-4 lg:p-5 xl:p-9 2xl:p-12'>
			<div className='relative z-10 flex flex-col w-full gap-2 bg lg:w-1/2 md:gap-4 lg:gap-6 xl:gap-10'>
				<img src={Logo} alt='logo' className='h-16 w-28' />
				<div className='flex flex-col'>
					<div className='text-center'>
						<h2 className='text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-semibold text-white lg:text-[#000]'>
							WELCOME TO <br className='hidden lg:block' /> HUBBIES!
						</h2>
					</div>

					<div className='relative flex w-3/4 p-2 mx-auto mt-2 mb-2 border rounded-full sm:w-2/3 md:w-2/4 md:mt-4 md:mb-4 lg:mb-8 2xl:mb-12 bg-primary-color border-button-color'>
						<div className='relative flex w-full'>
							<div
								className={`absolute top-0 bottom-0 left-0 w-1/2 h-full bg-button-color rounded-full transition-transform duration-300 ease-in-out ${
									!isLogin ? 'transform translate-x-full' : ''
								}`}
							></div>

							<button
								onClick={() => navigate('/login')}
								className={`w-1/2 py-1 xl:py-3 text-center text-base font-normal relative z-10 transition-all duration-300 ease-in-out ${
									isLogin ? 'text-white' : 'text-button-color'
								}`}
							>
								Login
							</button>

							<button
								onClick={() => navigate('/register')}
								className={`w-1/2 py-1 xl:py-3 text-center text-base font-normal relative z-10 transition-all duration-300 ease-in-out ${
									!isLogin ? 'text-white' : 'text-button-color'
								}`}
							>
								Register
							</button>
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full px-3 mx-auto space-y-4 lg:space-y-6 md:w-2/3 lg:w-3/4'
						autoComplete='off'
					>
						<div>
							<label htmlFor='email' className='block mb-2 text-sm font-semibold text-button-color'>
								Email address
							</label>
							<input
								id='email'
								type='email'
								{...register('email')}
								className={`w-full px-4 py-3 bg-white border rounded-full lg:bg-transparent border-button-color focus:outline-none focus:ring-0 ${
									errors.email ? 'border-red-500' : ''
								}`}
								placeholder='Enter your email'
							/>
							{errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
						</div>

						<div className='relative'>
							<label htmlFor='password' className='block mb-2 text-sm font-semibold text-button-color'>
								Password
							</label>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								className={`w-full px-4 py-3 bg-white border rounded-full lg:bg-transparent border-button-color focus:outline-none focus:ring-0 ${
									errors.password ? 'border-red-500' : ''
								}`}
								placeholder='Enter your Password'
							/>
							<div
								className='absolute flex items-center px-3 text-gray-600 cursor-pointer right-3 top-[55%]'
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<IoMdEyeOff className='text-button-color' />
								) : (
									<IoMdEye className='text-button-color' />
								)}
							</div>
							{errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
						</div>

						{isLogin && (
							<div className='flex items-center justify-between pr-2'>
								<div className='flex items-center gap-1'>
									<label
										data-ripple-dark='true'
										htmlFor='checkbox'
										className='relative flex items-center p-3 rounded-full cursor-pointer'
									>
										<input
											id='checkbox'
											className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-button-color checked:bg-primary-color border-button-color checked:before:bg-primary-color hover:before:opacity-10"
											type='checkbox'
											checked={rememberMe}
											onChange={handleRememberMeChange}
										/>
										<span className='absolute transition-opacity opacity-0 pointer-events-none text-button-color top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
											<svg
												strokeWidth='1'
												stroke='currentColor'
												fill='currentColor'
												viewBox='0 0 20 20'
												className='h-3.5 w-3.5'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													clipRule='evenodd'
													d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
													fillRule='evenodd'
												></path>
											</svg>
										</span>
									</label>
									<label
										htmlFor='checkbox'
										className='mt-px text-sm font-semibold cursor-pointer select-none sm:text-base text-button-color'
									>
										Remember me
									</label>
								</div>

								<div>
									<Link
										to='/forgot-password'
										className='text-xs font-semibold sm:text-sm text-button-color hover:text-orange-500'
									>
										Forgot your Password?
									</Link>
								</div>
							</div>
						)}

						<div className='flex justify-center lg:justify-end'>
							<button
								type='submit'
								disabled={loading}
								className='flex justify-center w-1/2 px-4 py-3 text-sm font-medium text-white transition-all duration-500 ease-in-out rounded-full bg-button-color hover:bg-orange-500'
							>
								{loading ? (
									<div className='w-4 h-4 border-b-2 border-white rounded-full animate-spin'></div>
								) : isLogin ? (
									'Sign In'
								) : (
									'Register'
								)}
							</button>
						</div>

						{!isLogin && (
							<div className='flex justify-center mt-4'>
								<button
									type='button'
									className='text-sm font-semibold text-button-color hover:text-orange-500'
									onClick={() => navigate('/register?role=Eventhost')}
								>
									You can register as EventHost?
								</button>
							</div>
						)}
					</form>
				</div>
			</div>

			<div className='hidden w-1/2 h-full lg:flex'>
				<img src={FormImage} alt='form-image' className='object-cover w-full h-full rounded-2xl' />
			</div>

			<div
				className='absolute inset-0 bg-center bg-no-repeat bg-cover lg:hidden'
				style={{
					backgroundImage: `url(${FormImage})`,
				}}
			>
				<div className='absolute inset-0 bg-black opacity-80'></div>
			</div>
		</div>
	);
};

export default FormAuth;
