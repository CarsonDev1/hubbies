import { LuMap } from 'react-icons/lu';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs';
import ContentImg01 from '../../assets/images/landing-img-01.png';
import { Button } from '../ui/button';

const ContentCard = () => {
	return (
		<div className='flex px-28 gap-4 py-6 border border-button-color bg-[#FFFBF2]'>
			<div className='flex flex-col gap-1'>
				<img src={ContentImg01} alt='content' width={189} height={189} />
				<div className='flex justify-between'>
					<LuMap className='size-6' />
					<div className='flex items-center gap-3'>
						<IoPaperPlaneOutline className='size-6' />
						<BsBookmark className='size-6' />
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-4'>
				<h3 className='text-xl font-bold lg:text-3xl'>COOKIE BAKING</h3>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-semibold md:text-base'>Time:</span>
					<span className='text-sm font-semibold md:text-base'>12-15.10.2024</span>
				</div>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-semibold md:text-base'>Host:</span>
					<span className='text-sm font-semibold md:text-base'>@the_baker_saigon</span>
				</div>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-semibold md:text-base'>Fee:</span>
					<span className='text-sm font-semibold md:text-base'>220.000 VND</span>
				</div>
				<Button
					variant='ghost'
					className='px-20 mb-2 text-sm text-white rounded-full md:mb-5 lg:mb-10 bg-button-color hover:bg-orange-500 hover:text-white'
				>
					DETAIL
				</Button>
			</div>
		</div>
	);
};

export default ContentCard;
