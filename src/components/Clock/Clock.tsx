import { useState, useEffect } from 'react';

export default function Clock() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const formatTime = (date: Date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const formattedHours = hours % 12 || 12;
		return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	};

	const formatDate = (date: Date) => {
		return date
			.toLocaleDateString('en-GB', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			})
			.replace(/\//g, '/');
	};

	return (
		<div className='w-full mx-auto bg-[#FFF4D880] py-9 px-8 shadow-lg border rounded-lg'>
			<div className='flex flex-col items-center justify-between gap-2 2xl:gap-0 2xl:flex-row'>
				<div className='flex items-center gap-3'>
					<div className='p-4 text-xl font-bold border rounded-md shadow-lg'>
						{formatTime(date).split(':')[0]}
					</div>
					<div className='text-xl font-bold'>:</div>
					<div className='p-4 text-xl font-bold border rounded-md shadow-lg'>
						{formatTime(date).split(':')[1]}
					</div>
					<div className='bg-[#8B4513] text-white text-xl font-bold p-4 rounded-md'>
						{date.getHours() >= 12 ? 'PM' : 'AM'}
					</div>
				</div>
				<div className='text-xl font-bold 2xl:text-2xl'>{formatDate(date)}</div>
			</div>
		</div>
	);
}
