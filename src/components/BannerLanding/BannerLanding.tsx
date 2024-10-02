import LandingBanner from '../../assets/images/landing-banner.png';

export default function BannerLanding() {
	return (
		<div className='bg-[#FFFBF2] w-full flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8'>
			<h1 className='mb-4 text-3xl font-extrabold text-center sm:text-4xl lg:text-5xl'>HUBBIES</h1>
			<p className='max-w-4xl mb-6 text-base font-bold text-center sm:text-lg lg:text-5xl'>
				A vibrant platform connecting you with tickets for joining local workshops like Art, DIY gift-making,
				and baking!
			</p>
			<div className='mx-auto mb-4'>
				<img
					src={LandingBanner}
					alt='Person working on pottery'
					width={665}
					height={300}
					className='rounded-lg'
				/>
			</div>
			<div className='mb-2 text-center'>
				<p className='text-base sm:text-lg'>Share the joy</p>
				<p className='text-base sm:text-lg'>Create the connection</p>
			</div>
			<div className='w-1/4 h-2 bg-[#8B4513]'></div>
		</div>
	);
}
