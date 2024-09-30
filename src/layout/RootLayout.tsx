import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarRoot from '../components/SideBarRoot/SideBarRoot';

interface RootLayoutProps {
	children: React.ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<div className='flex h-screen bg-gray-100'>
			<SideBarRoot
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className='flex-1 p-8 overflow-y-auto bg-[#f9f3e3]'>
				<div className='mx-auto'>
					{children}
					<ToastContainer />
				</div>
			</main>
		</div>
	);
};

export default RootLayout;
