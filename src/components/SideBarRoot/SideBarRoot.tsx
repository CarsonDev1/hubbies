import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface SideBarRootProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const SideBarRoot: React.FC<SideBarRootProps> = ({ isSidebarOpen, toggleSidebar }) => {
	return (
		<aside
			className={`fixed md:static inset-y-0 left-0 transform ${
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
			} md:translate-x-0 w-64 md:w-80 bg-[#f9f3e3] p-4 transition-transform duration-300 ease-in-out z-20 border-r-2 border-button-color flex flex-col items-center gap-20`}
		>
			<Button variant='ghost' size='icon' className='absolute top-4 right-4 md:hidden' onClick={toggleSidebar}>
				<X className='h-6 w-6' />
			</Button>
			<div className='mb-8 mt-16 md:mt-0'>
				<img src='/placeholder.svg' alt='Logo' width={40} height={40} />
			</div>
			<nav className='space-y-2 flex flex-col items-center'>
				{['DISCOVERY', 'FEATURES', 'TIMELINE', 'PROFILE', 'SETTING'].map((item) => (
					<Button key={item} variant='ghost' className={`w-full justify-start`}>
						{item}
					</Button>
				))}
			</nav>
		</aside>
	);
};

export default SideBarRoot;
