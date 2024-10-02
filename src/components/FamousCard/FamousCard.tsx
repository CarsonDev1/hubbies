import { Zap, Rocket, Moon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface Event {
	icon: React.ReactNode;
	name: string;
	participants: string;
	views: string;
}

const events: Event[] = [
	{
		icon: <Zap className='w-6 h-6 text-purple-500' />,
		name: 'Flotsam',
		participants: '40k+ participants',
		views: '40k+ views',
	},
	{
		icon: <Rocket className='w-6 h-6 text-blue-500' />,
		name: 'Astrom',
		participants: '40k+ participants',
		views: '40k+ views',
	},
	{
		icon: <Moon className='w-6 h-6 text-gray-500' />,
		name: '$Moon',
		participants: '40k+ participants',
		views: '40k+ views',
	},
];

export default function FamousCard() {
	return (
		<Card className='w-full mx-auto bg-[#FFF4D880]'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>Most famous event</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-4'>
				{events.map((event, index) => (
					<div key={index} className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='p-2 bg-white rounded-md'>{event.icon}</div>
							<h3 className='text-lg font-semibold'>{event.name}</h3>
						</div>
						<p className='text-sm text-gray-500'>{event.participants}</p>
						<div className='text-sm text-gray-500'>{event.views}</div>
					</div>
				))}
			</CardContent>
			<CardFooter>
				<Button className='w-max px-6 rounded-full mx-auto bg-[#8B4513] hover:bg-[#A0522D] text-white'>
					View all events
				</Button>
			</CardFooter>
		</Card>
	);
}
