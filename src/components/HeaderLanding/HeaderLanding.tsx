import { Button } from '../ui/button';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function HeaderLanding() {
	return (
		<header className='bg-[#FFFBF2] py-4 px-4 sm:px-6 container mx-auto flex justify-between items-center border-b border-[#8B4513]'>
			<img src={Logo} alt='Logo' />
			<div className='flex flex-col items-center gap-2 md:flex-row'>
				<Link to='/login'>
					<Button className='px-12 text-white rounded-full bg-button-color hover:bg-button-color/90'>
						Login
					</Button>
				</Link>
				<Link to='/register'>
					<Button
						variant='outline'
						className='px-12 rounded-full border-button-color text-button-color hover:bg-button-color/10'
					>
						Register
					</Button>
				</Link>
			</div>
		</header>
	);
}
