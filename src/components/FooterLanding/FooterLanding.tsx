import Logo from '../../assets/images/logo.png';
import { Button } from '../ui/button';

const FooterLanding = () => {
	return (
		<div>
			<footer className='bg-[#f9e4b7] p-8'>
				<div className='flex flex-col items-start justify-between max-w-6xl mx-auto md:flex-row'>
					<div className='mb-6 md:mb-0'>
						<img src={Logo} alt='Hubbies Logo' width={100} height={40} />
						<p className='mt-2 text-sm'>
							Share the joy
							<br />
							Create the connection
						</p>
					</div>
					<div className='grid grid-cols-1 gap-8 mb-6 text-sm md:grid-cols-3 md:mb-0'>
						<div>
							<h3 className='mb-2 font-bold'>DISCOVER</h3>
							<ul className='space-y-1'>
								<li>
									<a href='#' className='hover:underline'>
										HOT WORKSHOPS
									</a>
								</li>
								<li>
									<a href='#' className='hover:underline'>
										NEARBY WORKSHOPS
									</a>
								</li>
								<li>
									<a href='#' className='hover:underline'>
										MUST-TRY ACTIVITIES
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='mb-2 font-bold'>ABOUT US</h3>
							<ul className='space-y-1'>
								<li>
									<a href='#' className='hover:underline'>
										CONTACT
									</a>
								</li>
								<li>
									<a href='#' className='hover:underline'>
										FOLLOW US
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='mb-2 font-bold'>GET HELP</h3>
							<ul className='space-y-1'>
								<li>
									<a href='#' className='hover:underline'>
										PAYMENT OPTIONS
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='flex flex-row gap-2 mx-auto md:mx-0 md:flex-col'>
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
				</div>
				<div className='mt-8 text-sm text-center'>
					<p>Hubbies 2024 all rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default FooterLanding;
