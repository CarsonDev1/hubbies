/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import SideBarRoot from '../components/SideBarRoot/SideBarRoot';
import { RiSearch2Line, RiShoppingBag3Line } from 'react-icons/ri';
import { Camera, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import Avt from '../assets/images/avt.png';
import Logo from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContextMain';
import { jwtDecode } from 'jwt-decode';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

interface RootLayoutProps {
	children: React.ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

type FormData = {
	photo: File | null;
	host: string;
	price: number;
	time: string;
	date: string;
	place: string;
	description: string;
};

const schema = z.object({
	photo: z.instanceof(File).nullable().optional(),
	host: z.string().nonempty({ message: 'Host name is required' }),
	price: z.preprocess(
		(val) => (typeof val === 'string' ? parseFloat(val) : val),
		z.number().positive({ message: 'Price must be a positive number' })
	),
	time: z.string().nonempty({ message: 'Time is required' }),
	date: z.string().nonempty({ message: 'Date is required' }),
	place: z.string().nonempty({ message: 'Place is required' }),
	description: z
		.string()
		.min(50, 'Description must be at least 50 characters')
		.max(200, 'Description must be no more than 200 characters'),
});

const RootLayout: React.FC<RootLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { logout, user, fetchUserData } = useAuth();
	const accessToken = localStorage.getItem('accessToken') ?? '';
	const decodedRole: any = jwtDecode(accessToken);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: any) => {
		console.log(data);
		setIsDialogOpen(false);
	};

	useEffect(() => {
		if (!user) {
			fetchUserData();
		}
	}, [user, fetchUserData]);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<>
			<div className='flex h-full bg-[#f9f3e3] '>
				<SideBarRoot
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<main className='flex-1 w-full overflow-hidden p-2 md:p-4 lg:p-8 h-full bg-[#f9f3e3]'>
					<div className='flex items-center justify-between mb-4 lg:hidden'>
						<Button variant='ghost' size='icon' onClick={toggleSidebar}>
							<Menu className='w-6 h-6' />
						</Button>
						<img src={Logo} alt='Logo' width={64} height={64} />
						<Button variant='ghost' size='icon'>
							<img src={Avt} alt='User' width={32} height={32} className='rounded-full' />
						</Button>
					</div>
					<div className='items-center justify-around hidden mb-6 lg:flex'>
						<div className='relative flex items-center gap-4'>
							<div className='relative'>
								<RiSearch2Line className='absolute transform -translate-y-1/2 text-[#D1B186] left-3 top-1/2' />
								<input
									type='text'
									placeholder='Search workshop'
									className='pl-5 xl:pl-10 pr-3 py-2 xl:py-4 border border-button-color rounded-full w-80 xl:w-96 bg-transparent focus:outline-none placeholder:text-[#D1B186]'
								/>
							</div>
							<div className='bg-[#ffca66] p-3 rounded-full'>
								<Camera className='text-button-color' />
							</div>
						</div>
						<div className='flex items-center gap-6'>
							<div className='flex items-center space-x-2' onClick={logout}>
								<img src={Avt} alt='User' width={54} height={54} className='rounded-full' />
								<div className='flex flex-col gap-1'>
									{user ? (
										<div className='flex flex-col gap-1'>
											<h1>{user.userName}</h1>
											{decodedRole?.role === 'EventHost' && (
												<span className='px-4 py-0 text-white rounded-full w-fit bg-button-color'>
													Host
												</span>
											)}
										</div>
									) : (
										<p>Loading user information...</p>
									)}
								</div>
							</div>
							<div className='relative'>
								<RiShoppingBag3Line className='size-6' />
								<span className='absolute bottom-0 right-0 px-2 py-1 text-xs text-white translate-x-1/2 translate-y-1/2 rounded-full bg-button-color'>
									0
								</span>
							</div>
						</div>
					</div>
					<div className='w-full mx-auto'>
						{children}
						<ToastContainer />
					</div>
				</main>
				{isSidebarOpen && (
					<div className='fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden' onClick={toggleSidebar}></div>
				)}
			</div>
		</>
	);
};

export default RootLayout;
