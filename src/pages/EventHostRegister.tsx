/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBody, LoginBodyType, RegisterBody, RegisterBodyType } from '../schemaValidations/auth.schema';
import { toast } from 'react-toastify';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Logo from '../assets/images/logo.png';
import FormImage from '../assets/images/form-image.png';
import axiosInstance from '../utils/axiosIntance';

const EventHostAuth: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(location.pathname === '/login-eventhost');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsLogin(location.pathname === '/login-eventhost');
	}, [location]);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
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
				const response = await axiosInstance.post('/auths/register?role=EventHost', data);
				if (response.status === 200) {
					navigate('/login-eventhost');
					toast.success('EventHost registration successful!');
				}
			} else {
				const response = await axiosInstance.post('/auths/login', data);
				if (response.status === 200) {
					localStorage.setItem('token', response.data.accessToken);
					navigate('/dashboard');
					toast.success('Login successful!');
					window.location.reload();
				}
			}
		} catch (error: any) {
			toast.error(
				error.response?.data?.message || (isLogin ? 'Login failed.' : 'EventHost registration failed.')
			);
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
							{isLogin ? 'Login as EventHost' : 'Register as EventHost'}
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
								onClick={() => navigate('/login-eventhost')}
								className={`w-1/2 py-1 xl:py-3 text-center text-base font-normal relative z-10 transition-all duration-300 ease-in-out ${
									isLogin ? 'text-white' : 'text-button-color'
								}`}
							>
								Login
							</button>

							<button
								onClick={() => navigate('/register-eventhost')}
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

						<div className='flex justify-center lg:justify-end'>
							<button
								type='submit'
								disabled={loading}
								className='flex justify-center w-1/2 px-4 py-3 text-sm font-medium text-white transition-all duration-500 ease-in-out rounded-full bg-button-color hover:bg-orange-500'
							>
								{loading ? (
									<div className='w-4 h-4 border-b-2 border-white rounded-full animate-spin'></div>
								) : isLogin ? (
									'Login'
								) : (
									'Register'
								)}
							</button>
						</div>
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

export default EventHostAuth;
