import CardLastImage from '../../assets/images/card-last.png';

const cardData = [
	{
		id: 1,
		count: 120,
		text: 'Events Created',
	},
	{
		id: 2,
		count: 400,
		text: 'Care',
	},
	{
		id: 3,
		count: 350,
		text: 'Join',
	},
];

const CardLast = () => {
	return (
		<div className='grid grid-cols-1 gap-3 mb-4 md:grid-cols-2 xl:grid-cols-3'>
			{cardData.map((card) => (
				<div key={card.id} className='relative w-full'>
					<img src={CardLastImage} alt='card-last' width={227} height={80} className='rounded-md' />
					<div className='absolute bottom-0 left-0 flex flex-col items-center px-2 pb-2 text-white'>
						<span className='text-xl font-bold md:text-2xl lg:text-4xl'>{card.count}</span>
						<span className='text-xs'>{card.text}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardLast;
