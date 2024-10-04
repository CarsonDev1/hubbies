import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarRoot from '../components/SideBarRoot/SideBarRoot';
import { Button } from '../components/ui/button';
import { Menu } from 'lucide-react';
import { RiSearch2Line, RiShoppingBag3Line } from 'react-icons/ri';
import Avt from '../assets/images/avt.png';
import Logo from '../assets/images/logo.png';

interface RootLayoutProps {
	children: React.ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className='flex h-full bg-gray-100'>
			<SideBarRoot
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className='flex-1 p-2 md:p-4 lg:p-8 h-full bg-[#f9f3e3]'>
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
					<div className='relative'>
						<RiSearch2Line className='absolute transform -translate-y-1/2 text-[#D1B186] left-3 top-1/2' />
						<input
							type='text'
							placeholder='Search workshop'
							className='pl-5 xl:pl-10 pr-3 py-2 xl:py-4 border border-button-color rounded-full w-80 xl:w-96 bg-transparent focus:outline-none placeholder:text-[#D1B186]'
						/>
					</div>
					<div className='flex items-center gap-6'>
						<div className='flex items-center space-x-2'>
							<img src={Avt} alt='User' width={54} height={54} className='rounded-full' />
							<span className='font-bold'>thanhtomloveexe</span>
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
	);
};

export default RootLayout;
