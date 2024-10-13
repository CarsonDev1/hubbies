/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterBody, RegisterBodyType } from '../schemaValidations/auth.schema';
import { toast } from 'react-toastify';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Logo from '../assets/images/logo.png';
import FormImage from '../assets/images/form-image.png';
import axiosInstance from '../utils/axiosIntance';

const EventHostRegister: React.FC = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterBodyType>({
		resolver: zodResolver(RegisterBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: RegisterBodyType) => {
		setLoading(true);

		try {
			const response = await axiosInstance.post('/auths/register?role=EventHost', data);
			if (response.status === 200) {
				navigate('/login');
				toast.success('EventHost registration successful!');
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'EventHost registration failed.');
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
							Register as <br className='hidden lg:block' /> EventHost
						</h2>
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

export default EventHostRegister;
