import CardLastImage from '../../assets/images/card-last.png';

const CardLast = () => {
	return (
		<div className='grid grid-cols-1 gap-4 mb-6 md:grid-cols-3'>
			<div className='bg-[#98971a] text-white p-4 rounded-lg relative w-full overflow-hidden'>
				<img
					src={CardLastImage}
					alt='cart-last'
					width={800}
					height={500}
					className='absolute top-0 left-0 z-0 object-cover w-full h-full rounded-md'
				/>
				<div className='relative z-10'>
					<h2 className='text-4xl font-bold'>120</h2>
					<p>Event created</p>
				</div>
			</div>
			<div className='bg-[#98971a] text-white p-4 rounded-lg relative w-full overflow-hidden'>
				<img
					src={CardLastImage}
					alt='cart-last'
					width={800}
					height={500}
					className='absolute top-0 left-0 z-0 object-cover w-full h-full rounded-md'
				/>
				<div className='relative z-10'>
					<h2 className='text-4xl font-bold'>400</h2>
					<p>Care</p>
				</div>
			</div>
			<div className='bg-[#98971a] text-white p-4 rounded-lg relative w-full overflow-hidden'>
				<img
					src={CardLastImage}
					alt='cart-last'
					width={800}
					height={500}
					className='absolute top-0 left-0 z-0 object-cover w-full h-full rounded-md'
				/>
				<div className='relative z-10'>
					<h2 className='text-4xl font-bold'>350</h2>
					<p>Join</p>
				</div>
			</div>
		</div>
	);
};

export default CardLast;
