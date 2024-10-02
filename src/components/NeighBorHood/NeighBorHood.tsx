import { Button } from '../ui/button';
import NeighBor from '../../assets/images/landing-img-04.png';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function NeighBorHood() {
	return (
		<div className='bg-[#FFFBF2] p-8 relative'>
			<div className='absolute top-0 left-0 w-full h-full lg:h-2/3 bg-button-color'></div>
			<div className='max-w-6xl mx-auto'>
				<h1 className='text-[#FFF8DC] text-4xl md:text-6xl font-bold mb-4 leading-tight relative z-10'>
					MUST-TRY
					<br />
					ACTIVITIES IN THE
					<br />
					NEIGHBORHOOD
				</h1>
				<div className='relative mb-8'>
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
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6'>
					{[
						{
							title: 'CERAMIC WORKSHOP',
							host: '@haru_craft',
							image: { NeighBor },
						},
						{
							title: 'PERSONALIZE CANDLE',
							host: '@kofukuhome',
							image: { NeighBor },
						},
						{
							title: 'FIND YOUR OWN SCENT',
							host: '@morra.vn',
							image: { NeighBor },
						},
					].map((activity, index) => (
						<div
							key={index}
							className='bg-[#FFF8DC] w-full lg:w-2/3 relative lg:static rounded-3xl overflow-hidden p-3 border border-button-color'
						>
							<img
								src={NeighBor}
								alt={activity.title}
								width={300}
								height={300}
								className='relative z-10 object-cover w-full h-60'
							/>
							<div className='py-3'>
								<h2 className='text-[#8B4513] text-xl font-bold mb-2'>{activity.title}</h2>
								<p className='text-[#8B4513] mb-4'>{activity.host}</p>
								<Button
									variant='ghost'
									className='py-2 text-sm text-white rounded-full px-14 bg-button-color hover:bg-orange-500 hover:text-white w-max'
								>
									DETAIL
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
