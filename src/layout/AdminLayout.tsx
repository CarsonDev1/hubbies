import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';

interface AdminLayoutProps {
	children: React.ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className='flex h-screen bg-[#FFFEE5]'>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className='flex-1 p-3 overflow-x-hidden overflow-y-auto lg:p-6'>
				{activeTab === 'profile' ? (
					<ProfileHeader toggleSidebar={toggleSidebar} />
				) : (
					<Header toggleSidebar={toggleSidebar} />
				)}

				<div className='mx-auto pt-14'>
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

export default AdminLayout;
