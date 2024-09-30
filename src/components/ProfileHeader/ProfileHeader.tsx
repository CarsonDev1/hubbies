import React from 'react';
import Avt from '../../assets/images/avt-content-01.png';
import { Button } from '../ui/button';
import { GoGear } from 'react-icons/go';
import { Menu } from 'lucide-react';

interface HeaderProps {
	toggleSidebar: () => void;
}

const ProfileHeader: React.FC<HeaderProps> = ({ toggleSidebar }) => {
	return (
		<header className='flex flex-wrap items-center justify-between w-full gap-4 py-2 xs:py-4 xs:flex-nowrap sm:py-2 xl:w-3/4'>
			<div className='flex sm:hidden'>
				<Button variant='ghost' size='icon' onClick={toggleSidebar}>
					<Menu className='w-5 h-5' />
				</Button>
			</div>

			<div className='flex items-center flex-grow gap-2 sm:gap-4'>
				<img
					src={Avt}
					alt='Profile avatar'
					width={50}
					height={50}
					className='object-cover rounded-full sm:w-14 sm:h-14'
				/>
				<div className='flex flex-col gap-1 text-xs sm:text-sm md:text-base'>
					<span className='text-base font-bold sm:text-lg md:text-xl'>localartmarket</span>
					<span className='text-xs text-gray-600 sm:text-sm'>Ho Chi Minh City, Vietnam</span>
					<p className='text-xs italic text-button-color sm:text-sm'>
						Proud to be a lô-cồ brand and use lô-cồ things
					</p>
				</div>
			</div>

			<div className='flex items-center gap-1 sm:gap-2'>
				<Button
					variant='ghost'
					className='px-2 py-1 text-xs font-semibold uppercase border-2 rounded-full sm:text-sm md:text-base sm:px-3 sm:py-1 lg:px-5 lg:py-2 border-button-color'
				>
					Edit Profile
				</Button>
				<GoGear className='w-5 h-5 text-gray-700 sm:w-6 sm:h-6 md:w-7 md:h-7' />
			</div>
		</header>
	);
};

export default ProfileHeader;
