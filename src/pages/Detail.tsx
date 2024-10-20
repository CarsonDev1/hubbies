/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTicketEventsById } from '../api/tickets/getTicketId';
import { Card, CardContent } from '../components/ui/card';
import NeighBor from '../assets/images/landing-img-01.png';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';

const Cart = () => {
	// Lấy ticketId từ URL
	const { ticketId } = useParams<{ ticketId: any }>();

	const {
		data: ticket,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['ticket', ticketId],
		queryFn: () => getTicketEventsById({ id: ticketId }),
		enabled: !!ticketId,
	});

	// State to manage quantity
	const [quantity, setQuantity] = useState(1);

	// Update quantity when ticket data is fetched
	useEffect(() => {
		if (ticket && ticket.quantity) {
			setQuantity(ticket.quantity);
		}
	}, [ticket]);

	// Function to handle adding to cart
	const handleAddToCart = useCallback(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

		// Lưu tất cả thông tin sản phẩm vào giỏ hàng
		const newCart = [
			...storedCart,
			{
				ticketId,
				name: ticket.name,
				image: ticket.image,
				quantity,
				price: ticket.price,
				address: ticket.address,
				description: ticket.description,
				host: 'Chika Pottery',
				postDate: ticket.postDate,
			},
		];

		localStorage.setItem('cart', JSON.stringify(newCart));

		// Hiển thị toast thông báo một lần
		toast.success('Add to cart success!', { position: 'top-right', autoClose: 3000 });

		// Trigger a custom event to notify RootLayout to update the cart count
		const event = new Event('cart-updated');
		window.dispatchEvent(event);
	}, [ticketId, ticket, quantity]);

	if (!ticketId) {
		return <p>Error: Ticket ID is missing</p>;
	}

	if (isLoading) return <p>Loading ticket details...</p>;
	if (isError) return <p>Error loading ticket details...</p>;

	return (
		<div className='flex flex-col items-center md:items-start gap-9'>
			<div className='flex flex-col items-center md:items-start gap-9'>
				<Card className='w-full overflow-hidden bg-transparent border-none shadow-none'>
					<CardContent className='flex flex-col gap-5 p-0 md:gap-12 sm:flex-row'>
						<div className='flex flex-col w-full gap-4 sm:w-2/4'>
							<img
								src={ticket.image}
								alt='Ticket image'
								width={400}
								height={400}
								className='object-cover mx-auto rounded-lg'
							/>
							<div className='flex flex-col items-center gap-5 mb-4 sm:flex-row'>
								<div className='flex items-center gap-4 mt-4 sm:mt-0'>
									<Button
										className='w-full sm:w-max bg-[#f0c14b] hover:bg-[#ddb347] text-black font-bold py-2 px-4 rounded-full'
										onClick={handleAddToCart}
									>
										ADD TO CART
									</Button>
								</div>
							</div>
						</div>
						{/* Ticket Details */}
						<div className='w-full sm:w-3/4'>
							<div className='flex flex-col items-center gap-3 md:items-start'>
								<h2 className='mb-1 text-2xl font-bold text-center sm:text-left'>{ticket.name}</h2>
								<p className='mb-1 text-xl text-center sm:text-left'>
									<span className='font-bold'>Host by:</span> Chika Pottery
								</p>
								<p className='text-xl font-bold text-center sm:text-left'>
									Ticket Price:{' '}
									<span className='text-button-color'>{ticket.price.toLocaleString()} VND</span>
								</p>
								<p className='text-xl font-bold text-center sm:text-left'>
									Time:{' '}
									<span className='text-button-color'>
										{new Date(ticket.postDate).toLocaleDateString('vi-VN')}
									</span>
								</p>

								<p className='flex flex-col w-2/3 gap-1 mb-1 text-xl text-center sm:text-left'>
									<span className='font-bold'>Place:</span> <span>{ticket.address}</span>
								</p>
								<p className='flex flex-col w-2/3 gap-1 mb-1 text-xl text-center sm:text-left'>
									<span className='font-bold'>Description:</span> <span>{ticket.description}</span>
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<h3 className='text-2xl font-bold text-center sm:text-left'>YOU MAY ALSO LIKE</h3>
			<div className='grid w-full grid-cols-1 gap-4 2xl:w-2/3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6'>
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
						className='bg-[#FFF8DC] w-full relative lg:static rounded-3xl overflow-hidden p-3 border border-button-color'
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
	);
};

export default Cart;
