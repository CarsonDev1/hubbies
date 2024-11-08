import CardLastImage from '../../assets/images/card-last.png';

const CardLast = () => {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 md:grid-cols-4'>
			<div className='bg-[#98971a] text-white p-4 rounded-lg relative w-full overflow-hidden'>
				<img
					src={CardLastImage}
					alt='cart-last'
					width={800}
					height={500}
					className='absolute top-0 left-0 z-0 object-cover w-full h-full rounded-md'
				/>
				<div className='relative z-10'>
					<h2 className='text-2xl font-bold'>7</h2>
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
					<p>Revenue</p>
					<h2 className='text-sm md:text-xl font-bold'>1.246.000 VND</h2>
					<p>Profit</p>
					<h2 className='text-sm md:text-xl font-bold'>17.800.000 VND</h2>
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
					<h2 className='text-2xl font-bold'>21</h2>
					<p>Join</p>
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
					<h2 className='text-2xl font-bold'>104</h2>
					<p>Order</p>
				</div>
			</div>
		</div>
	);
};

export default CardLast;
