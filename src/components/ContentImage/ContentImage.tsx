import { LuMap } from 'react-icons/lu';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs';
import ContentImg04 from '../../assets/images/landing-img-04.png';
import { Button } from '../ui/button';

const ContentImage = () => {
	return (
		<div className='flex flex-col items-center lg:items-start gap-4 py-6 px-4 bg-[#FFFBF2]'>
			<div className='flex gap-2'>
				<div className='flex flex-col gap-1'>
					<img src={ContentImg04} alt='content' width={400} height={326} />
				</div>
				<div className='flex flex-col gap-1'>
					<img src={ContentImg04} alt='' width={159} height={159} className='object-cover h-full' />
					<img src={ContentImg04} alt='' width={159} height={159} className='object-cover h-full' />
				</div>
			</div>
			<div className='flex justify-between w-[44%]'>
				<LuMap className='size-6' />
				<div className='flex items-center gap-3'>
					<IoPaperPlaneOutline className='size-6' />
					<BsBookmark className='size-6' />
				</div>
			</div>
			<h3 className='text-xl font-bold lg:text-3xl'>LẶNG FLOWER CONCEPT</h3>
			<Button
				variant='ghost'
				className='px-20 mb-2 text-sm text-white rounded-full md:mb-5 lg:mb-10 bg-button-color hover:bg-orange-500 hover:text-white w-max'
			>
				DETAIL
			</Button>
		</div>
	);
};

export default ContentImage;
