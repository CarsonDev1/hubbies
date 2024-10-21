import { Suspense, useState, useCallback } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AvtContent01 from '../assets/images/avt-content-01.png';
import { LuMap } from 'react-icons/lu';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import { useAuth } from '../contexts/AuthContextMain';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { getTicketEvents } from '../api/tickets/getTicket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
	const { isAuthenticated, user } = useAuth();
	const [selectedDate, setSelectedDate] = useState(18);
	const [highlightedDate] = useState(12);
	const page = 1;
	const pageSize = 10;
	const navigate = useNavigate();

	const accessToken = localStorage.getItem('accessToken') ?? '';
	const decodedRole: any = jwtDecode(accessToken);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['listTickets', page, pageSize],
		queryFn: () => getTicketEvents(page, pageSize),
		select: (response) => response.data,
	});

	// Function to handle adding an event to the cart
	const handleAddToCart = useCallback((event: any) => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

		// Add selected event to the cart
		const newCart = [
			...storedCart,
			{
				ticketId: event.id,
				name: event.name,
				image: event.image,
				price: event.price,
				address: event.address,
				description: event.description,
				host: 'Chika Pottery',
				postDate: event.postDate,
			},
		];

		localStorage.setItem('cart', JSON.stringify(newCart));

		// Show success toast notification
		toast.success('Add to cart success!', { position: 'top-right', autoClose: 3000 });

		// Trigger a custom event to notify RootLayout to update the cart count
		const cartUpdatedEvent = new Event('cart-updated');
		window.dispatchEvent(cartUpdatedEvent);
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error loading events...</p>;
	}

	if (!isAuthenticated) {
		window.location.href = '/login';
		return null;
	}

	const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	const dates = Array.from({ length: 31 }, (_, i) => i + 1);

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div>
				<div className='flex flex-col gap-4 md:flex-row'>
					<div className='w-full md:w-2/3 px-2 md:px-6 lg:px-8 xl:w-[65%]'>
						{data?.map((event: any) => (
							<div className='space-y-6' key={event.id}>
								{/* Content Cards */}
								<Card className='overflow-hidden bg-transparent border rounded-3xl mb-5 border-button-color'>
									<CardContent className='p-4'>
										<div className='flex items-center mb-2'>
											<img
												src={AvtContent01}
												alt='User'
												width={40}
												height={40}
												className='mr-2 rounded-full'
											/>
											<div>
												<h3 className='font-semibold'>{event.name}</h3>
												<p className='text-sm text-gray-500'>@{user?.userName}</p>
											</div>
										</div>
										<div className='flex flex-col gap-6'>
											<h3 className='font-semibold'>{event.content}4</h3>
											<p className='w-8 h-[2px] bg-black'></p>
											<p className='mb-2 text-sm'>{event.description}</p>
										</div>
										<img
											src={event.image}
											alt='Tet Market'
											width={400}
											height={200}
											className='object-cover w-full h-auto mb-4 rounded-md md:mb-10 lg:mb-20'
										/>
										<div className='flex flex-row items-center justify-between gap-6 mb-5 md:flex-col xl:flex-row md:mb-10'>
											<div className='flex items-center gap-3'>
												<LuMap className='size-6' />
												<IoPaperPlaneOutline className='size-6' />
											</div>
											<div className='flex items-center gap-3'>
												<Button
													variant='ghost'
													className='px-3 text-sm text-white rounded-full md:px-10 xl:px-20 bg-button-color hover:bg-orange-500 hover:text-white'
													onClick={() => navigate(`/cart/${event.id}`)}
												>
													DETAIL
												</Button>
												<Button
													variant='ghost'
													className='px-3 md:px-10 xl:px-20 text-sm rounded-full bg-[#FFD583] hover:bg-orange-500 hover:text-white'
													onClick={() => handleAddToCart(event)}
												>
													ADD TO CART
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						))}
					</div>

					{/* Calendar Section */}
					{decodedRole?.role !== 'EventHost' && (
						<div className='p-4 font-sans h-fit bg-[#FFD583] rounded-xl w-full md:w-1/2 xl:w-1/4'>
							<h2 className='mb-4 text-xl font-bold'>January 2023</h2>
							<div className='grid grid-cols-7 gap-2 justify-items-center'>
								{days.map((day, index) => (
									<div
										key={day}
										className={`text-center font-medium ${index > 4 ? 'text-red-500' : ''}`}
									>
										{day}
									</div>
								))}
								{[...Array(dates[0] - 1)].map((_, index) => (
									<div key={`empty-${index}`} />
								))}
								{dates.map((date) => (
									<button
										key={date}
										className={`w-8 h-8 flex items-center justify-center rounded-full ${
											date === selectedDate
												? 'bg-amber-700 text-white'
												: date === highlightedDate
												? 'bg-gray-200'
												: ''
										} ${[7, 8, 14, 15, 21, 22, 28, 29].includes(date) ? 'text-red-500' : ''}`}
										onClick={() => setSelectedDate(date)}
									>
										{date}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default Home;
