import React from 'react';
import Logo from '../assets/images/logo.png';
import FormImage from '../assets/images/form-image.png';

const ForgotPassword: React.FC = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className='relative flex-col justify-between min-h-screen p-3 md:flex md:flex-row md:p-4 lg:p-5 xl:p-9 2xl:p-12'>
			<div className='relative z-10 flex flex-col w-full gap-2 bg lg:w-1/2 md:gap-4 lg:gap-6 xl:gap-10'>
				<img src={Logo} alt='logo' className='h-16 w-28' />
				<div className='flex flex-col gap-3 md:gap-6 lg:gap-12'>
					<div className='text-center'>
						<h2 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-white lg:text-[#000]'>
							FORGOT YOUR PASSWORD?
						</h2>
					</div>

					<form
						onSubmit={handleSubmit}
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
								className='w-full px-4 py-3 bg-white border rounded-full lg:bg-transparent border-button-color focus:outline-none focus:ring-0'
								placeholder='Enter your email'
								autoComplete='off'
								required
							/>
						</div>

						<div className='flex justify-center lg:justify-end'>
							<button
								type='submit'
								className='flex justify-center w-1/2 px-4 py-3 text-sm font-medium text-white transition-all duration-500 ease-in-out rounded-full bg-button-color hover:bg-orange-500'
							>
								Request Password Reset
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

export default ForgotPassword;
