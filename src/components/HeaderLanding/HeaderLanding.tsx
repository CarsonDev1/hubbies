import { Button } from '../ui/button';
import Logo from '../../assets/images/logo.png';

export default function HeaderLanding() {
	return (
		<header className='bg-[#FFFBF2] py-4 px-6 container mx-auto flex justify-between items-center border-b border-[#8B4513]'>
			<img src={Logo} alt='Logo' />
			<div className='space-x-4'>
				<Button className='px-12 text-white rounded-full bg-button-color hover:bg-button-color/90'>
					Login
				</Button>
				<Button
					variant='outline'
					className='px-12 rounded-full border-button-color text-button-color hover:bg-button-color/10'
				>
					Register
				</Button>
			</div>
		</header>
	);
}
