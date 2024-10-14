/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Avt from '../../assets/images/avt.png';
import Logo from '../../assets/images/logo.png';
import { GoBell } from 'react-icons/go';
import { RiSearch2Line } from 'react-icons/ri';
import { Button } from '../ui/button';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {
	toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
	const { token, isAuthenticated } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState<{ userName: string } | null>(null);
	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const [decodedToken, setDecodedToken] = useState();

	console.log('decodedToken', decodedToken);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchUserInfo = async () => {
				setLoadingUserInfo(true);
				const currentToken = token || localStorage.getItem('token');
				if (currentToken) {
					try {
						const decoded = jwtDecode(currentToken);
						setDecodedToken(decoded as any);
						const response = await axios.get('https://hubbies-be.azurewebsites.net/api/accounts', {
							headers: {
								Authorization: `Bearer ${currentToken}`,
							},
						});
						if (response.status === 200 && response.data) {
							setUserInfo(response.data);
						}
					} catch (error) {
						console.log('Error fetching user info:', error);
					} finally {
						setLoadingUserInfo(false);
					}
				} else {
					setLoadingUserInfo(false);
				}
			};
			fetchUserInfo();
		} else {
			setLoadingUserInfo(false);
		}
	}, [isAuthenticated, token]);
	return (
		<>
			{loadingUserInfo ? (
				<LoadingSpinner />
			) : (
				<header className='fixed lg:relative top-0 left-0 w-full shadow-md lg:shadow-none z-10 bg-[#FFFEE5] lg:bg-transparent'>
					<div className='flex items-center justify-between py-2 lg:hidden'>
						<Button variant='ghost' size='icon' onClick={toggleSidebar}>
							<Menu className='w-6 h-6' />
						</Button>
						<img src={Logo} alt='Logo' width={64} height={64} />
						<Button variant='ghost' size='icon'>
							<img src={Avt} alt='User' width={32} height={32} className='rounded-full' />
						</Button>
					</div>

					<div className='items-center justify-between hidden mb-6 lg:flex'>
						<div className='relative flex-1 w-2/3'>
							<RiSearch2Line className='absolute w-6 h-7 transform -translate-y-1/2 text-[#D1B186] left-3 top-1/2 hidden xl:block' />
							<input
								type='text'
								placeholder='Search events, users or hosts'
								className='pl-5 xl:pl-10 pr-3 py-2 xl:py-4 border border-button-color rounded-full w-full bg-transparent focus:outline-none placeholder:text-[#D1B186]'
							/>
						</div>
						<div className='flex items-center justify-end w-2/6 gap-6'>
							<div className='flex items-center space-x-2'>
								<img src={Avt} alt='User' width={54} height={54} className='rounded-full' />
								{isAuthenticated && userInfo ? (
									<span className='font-bold'>{userInfo.userName}</span>
								) : (
									<span className='font-bold'>Guest</span>
								)}
							</div>
							<div className='relative'>
								<GoBell className='px-2 py-1 text-white rounded-full size-9 bg-button-color' />
							</div>
						</div>
					</div>
				</header>
			)}
		</>
	);
};

export default Header;
