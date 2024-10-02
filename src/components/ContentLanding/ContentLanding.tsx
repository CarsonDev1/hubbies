import ContentCard from '../ContentCard/ContentCard';
import ContentImage from '../ContentImage/ContentImage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function ContentLanding() {
	return (
		<div className='flex flex-col w-full lg:flex-row'>
			<div className='w-full h-full border lg:w-2/3 border-button-color'>
				<div className='bg-[#FFD583] text-xl md:text-2xl lg:text-4xl font-extrabold flex justify-center py-6'>
					HOT WORKSHOPS <br /> THIS WEEK
				</div>
				<ContentCard />
				<ContentCard />
				<ContentCard />
				<ContentCard />
			</div>
			<div className='w-full border lg:w-1/3'>
				<div className='flex justify-center py-6 text-xl font-extrabold text-white bg-button-color md:text-2xl lg:text-4xl'>
					TOP FAVOURITE <br /> WORKSHOP HOLDERS
				</div>
				<div className='flex p-4'>
					<Select>
						<SelectTrigger className='w-1/3 lg:w-1/4 border border-button-color rounded-full bg-[#FFE4B5] text-[#8B4513]'>
							<SelectValue placeholder='Ho Chi Minh City' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='hcmc'>Ho Chi Minh City</SelectItem>
							<SelectItem value='hanoi'>Ha Noi</SelectItem>
							<SelectItem value='danang'>Da Nang</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<ContentImage />
				<ContentImage />
			</div>
		</div>
	);
}
