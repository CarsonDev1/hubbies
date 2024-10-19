import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

interface SideBarRootProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const SideBarRoot: React.FC<SideBarRootProps> = ({ isSidebarOpen, toggleSidebar }) => {
	return (
		<aside
			className={`fixed lg:static inset-y-0 left-0 transform ${
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
			} lg:translate-x-0 w-64 md:w-80 bg-[#f9f3e3] flex flex-col gap-20 items-center p-6 transition-transform duration-300 ease-in-out z-20 border-r-2 border-button-color`}
		>
			<Button variant='ghost' size='icon' className='absolute top-4 right-4 lg:hidden' onClick={toggleSidebar}>
				<X className='w-6 h-6' />
			</Button>
			<Link to='/'>
				<div className='mt-16 mb-12 lg:mt-0'>
					<img src={Logo} alt='Logo' width={118} height={61} />
				</div>
			</Link>
			<nav className='space-y-6'>
				{['HOME', 'DISCOVERY', 'FEATURES', 'PROFILE'].map((item) => (
					<Button
						key={item}
						variant='ghost'
						className='justify-start w-full pl-8 text-xl font-semibold md:text-2xl lg:text-3xl'
					>
						{item}
					</Button>
				))}
			</nav>
		</aside>
	);
};

export default SideBarRoot;
