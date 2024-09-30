import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiBell, FiSettings } from 'react-icons/fi';
import { HiOutlineHome } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Logo from '../../assets/images/logo.png';

interface SidebarProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

	const toggleSubmenu = (menuId: string) => {
		setOpenSubmenu(openSubmenu === menuId ? null : menuId);
	};

	return (
		<nav className='flex flex-col items-center gap-6 shadow-md bg-primary-color w-80'>
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
							{ label: 'Add User', path: '/users/add' },
							{ label: 'View Users', path: '/users/view' },
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
							{ label: 'Add User', path: '/users/add' },
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
					<li key={item.id} className='w-full px-16'>
						<NavLink
							to={item.path}
							className={({ isActive }) =>
								`flex items-center justify-between w-full px-6 py-2 rounded-md ${
									isActive ? 'bg-second-color text-white' : 'text-black hover:text-button-color'
								}`
							}
							onClick={() => {
								setActiveTab(item.id);
								if (item.submenu) {
									toggleSubmenu(item.id);
								}
							}}
						>
							<div className='flex items-center gap-2'>
								<item.icon />
								<span className='font-semibold uppercase'>{item.label}</span>
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
													isActive ? 'text-button-color' : 'text-gray-700 hover:text-black'
												}`
											}
											onClick={() => setActiveTab(subItem.label)}
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
	);
};

export default Sidebar;
