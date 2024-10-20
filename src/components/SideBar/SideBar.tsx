import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiBell, FiSettings } from 'react-icons/fi';
import { HiOutlineHome } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Logo from '../../assets/images/logo.png';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import CreatePost from '../../pages/CreatePost';

interface SideBarProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ setActiveTab, isSidebarOpen, toggleSidebar }) => {
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleSubmenu = (menuId: string) => {
		setOpenSubmenu(openSubmenu === menuId ? null : menuId);
	};

	const handleAddUserClick = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<nav
				className={`fixed lg:static inset-y-0 left-0 transform ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 w-64 2xl:w-80 bg-[#f9f3e3] flex flex-col gap-5 md:gap-10 lg:gap-20 items-center transition-transform duration-300 ease-in-out z-20`}
			>
				<Button
					variant='ghost'
					size='icon'
					className='absolute top-4 right-4 lg:hidden'
					onClick={toggleSidebar}
				>
					<X className='w-6 h-6' />
				</Button>
				<div className='p-4'>
					<img src={Logo} alt='logo' />
				</div>
				<ul className='w-full space-y-6'>
					{[
						{
							id: 'home',
							icon: HiOutlineHome,
							label: 'Home',
							path: '/',
						},
						{
							id: 'dashboard',
							icon: RxDashboard,
							label: 'Dashboard',
							path: '/dashboard',
							submenu: [
								{ label: 'View User', path: '/dashboard/users' },
								{ label: 'View Ticket', path: '/dashboard/tickets' },
								{ label: 'View Category', path: '/dashboard/category' },
								{ label: 'View Order', path: '/dashboard/order' },
							],
						},
						{
							id: 'notifications',
							icon: FiBell,
							label: 'Notifications',
							path: '/notifications',
						},
						{
							id: 'profile',
							icon: LuUser2,
							label: 'Your Profile',
							path: '/your-profile',
							submenu: [
								{ label: 'Add User', path: '', onClick: handleAddUserClick },
								{ label: 'View Users', path: '/users/view' },
							],
						},
						{
							id: 'setting',
							icon: FiSettings,
							label: 'Setting',
							path: '/setting',
						},
						{
							id: 'auth',
							icon: RiLogoutCircleRLine,
							label: 'Log out',
							path: '/logout',
						},
					].map((item) => (
						<li key={item.id} className='w-full px-4 md:px-8 2xl:px-16'>
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									`flex items-center justify-between w-full p-2 rounded-md ${
										isActive ? 'bg-second-color text-white' : 'text-black hover:text-button-color'
									}`
								}
								onClick={() => {
									if (item.submenu) {
										toggleSubmenu(item.id);
									} else {
										setActiveTab(item.id);
									}
								}}
							>
								<div className='flex items-center gap-2'>
									<item.icon className='size-6' />
									<span className='inline-flex font-semibold uppercase'>{item.label}</span>
								</div>
							</NavLink>

							{item.submenu && (
								<ul
									className={`transition-all duration-300 overflow-hidden ${
										openSubmenu === item.id ? 'max-h-40' : 'max-h-0'
									}`}
									style={{ paddingLeft: '1.5rem' }}
								>
									{item.submenu.map((subItem, index) => (
										<li key={index} className='py-2'>
											<NavLink
												to={subItem.path}
												className={({ isActive }) =>
													`block ${
														isActive
															? 'text-button-color'
															: 'text-gray-700 hover:text-black'
													}`
												}
												onClick={(e) => {
													if (subItem.onClick) {
														subItem.onClick();
														e.preventDefault();
													} else {
														setActiveTab(subItem.label);
													}
													e.stopPropagation();
												}}
											>
												{subItem.label}
											</NavLink>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</nav>
			{isModalOpen && <CreatePost onClose={closeModal} />}
		</>
	);
};

export default Sidebar;
