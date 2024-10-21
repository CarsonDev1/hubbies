/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent } from '../components/ui/card';
import NeighBor from '../assets/images/landing-img-01.png';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { createOrder } from '../api/order/createOrder';

const CartPayment = () => {
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
	const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});

	// Load cart items from localStorage
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		setCartItems(storedCart);

		const initialQuantities = storedCart.reduce((acc: any, item: any) => {
			acc[item.ticketId] = 1;
			return acc;
		}, {});

		const initialSubtotals = storedCart.reduce((acc: any, item: any) => {
			acc[item.ticketId] = (item.price || 0) * 1;
			return acc;
		}, {});

		setQuantity(initialQuantities);
		setSubtotals(initialSubtotals);
	}, []);

	const mutation = useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			toast.success('Payment placed successfully!', { position: 'top-right', autoClose: 3000 });
			localStorage.removeItem('cart');
			setCartItems([]);
		},
		onError: (error: any) => {
			if (error.response?.data?.detail?.includes('Unsufficient quantity')) {
				toast.error('Some items are out of stock or have insufficient quantity. Please adjust your cart.', {
					position: 'top-right',
					autoClose: 3000,
				});
			} else {
				toast.error('Out of tickets.', { position: 'top-right', autoClose: 3000 });
			}
		},
	});

	const handleIncreaseQuantity = (ticketId: string) => {
		const item = cartItems.find((item) => item.ticketId === ticketId);

		if (item.availableQuantity && quantity[ticketId] >= item.availableQuantity) {
			toast.error('Not enough tickets available.', { position: 'top-right', autoClose: 3000 });
			return;
		}

		setQuantity((prev) => ({ ...prev, [ticketId]: prev[ticketId] + 1 }));
		setSubtotals((prev) => ({
			...prev,
			[ticketId]: (prev[ticketId] || 0) + item.price,
		}));
	};

	const handleDecreaseQuantity = (ticketId: string) => {
		if (quantity[ticketId] > 1) {
			setQuantity((prev) => ({ ...prev, [ticketId]: prev[ticketId] - 1 }));
			setSubtotals((prev) => ({
				...prev,
				[ticketId]: prev[ticketId] - cartItems.find((item) => item.ticketId === ticketId).price,
			}));
		}
	};

	const handleRemoveItem = (ticketId: string) => {
		// Cập nhật state cartItems
		const updatedCartItems = cartItems.filter((item) => item.ticketId !== ticketId);
		setCartItems(updatedCartItems);

		// Cập nhật state quantity và subtotals
		const { [ticketId]: _, ...updatedQuantities } = quantity;
		setQuantity(updatedQuantities);

		const { [ticketId]: __, ...updatedSubtotals } = subtotals;
		setSubtotals(updatedSubtotals);

		// Cập nhật localStorage
		localStorage.setItem('cart', JSON.stringify(updatedCartItems));

		// Hiển thị thông báo
		toast.success('Item removed successfully!', { position: 'top-right', autoClose: 3000 });
	};

	const handlePlacePayment = () => {
		// Kiểm tra nếu có vé nào có số lượng không đủ
		const insufficientQuantityItems = cartItems.filter(
			(item) => item.availableQuantity === 0 || quantity[item.ticketId] > item.availableQuantity
		);

		if (insufficientQuantityItems.length > 0) {
			toast.error('Some items are out of stock or have insufficient quantity. Please adjust your cart.', {
				position: 'top-right',
				autoClose: 3000,
			});
			return;
		}

		const orderDetails = cartItems.map((item) => ({
			ticketEventId: item.ticketId,
			location: item.address,
			preferredTime: new Date().toISOString().split('T')[0],
			quantity: quantity[item.ticketId],
		}));

		const orderData = {
			address: 'HCM', // Có thể là địa chỉ thực tế của người dùng
			orderDetails,
		};

		// Gọi mutation để tạo đơn hàng
		mutation.mutate(orderData);
	};

	if (!cartItems.length) {
		return <p>No items in cart</p>;
	}

	return (
		<div className='flex flex-col items-center md:items-start gap-9'>
			<div className='flex flex-col items-center md:items-start gap-9'>
				{cartItems.map((ticket, index) => (
					<Card key={index} className='w-full overflow-hidden bg-transparent border-none shadow-none'>
						<CardContent className='flex flex-col gap-5 p-0 md:gap-12 sm:flex-row'>
							<div className='flex flex-col w-full gap-4 sm:w-2/4'>
								<img
									src={ticket.image || NeighBor}
									alt='Ticket image'
									width={400}
									height={400}
									className='object-cover mx-auto rounded-lg'
								/>
							</div>
							<div className='w-full sm:w-3/4'>
								<div className='flex flex-col items-center gap-3 md:items-start'>
									<h2 className='mb-1 text-2xl font-bold text-center sm:text-left'>{ticket.name}</h2>
									<p className='mb-1 text-xl text-center sm:text-left'>
										<span className='font-bold'>Host by:</span> {ticket.host}
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
									<div className='flex flex-col items-center gap-5 mb-4 sm:flex-row'>
										<div className='flex items-center'>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => handleDecreaseQuantity(ticket.ticketId)}
												className='text-xl'
											>
												-
											</Button>
											<input
												type='text'
												className='w-16 p-1 px-3 text-xl font-semibold text-center border rounded-md border-button-color'
												value={quantity[ticket.ticketId]}
												onChange={(e) =>
													setQuantity((prev) => ({
														...prev,
														[ticket.ticketId]: Math.max(1, Number(e.target.value)),
													}))
												}
												style={{
													WebkitAppearance: 'none',
													MozAppearance: 'textfield',
												}}
											/>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => handleIncreaseQuantity(ticket.ticketId)}
												className='text-xl'
											>
												+
											</Button>
										</div>
										<div className='flex items-center gap-2'>
											<span className='font-bold'>Subtotal: </span>
											<span className='text-lg font-bold text-button-color'>
												{subtotals[ticket.ticketId]?.toLocaleString()} VND
											</span>
										</div>
									</div>
									<div className='flex items-center gap-4 mt-4 sm:mt-0'>
										<Button
											className='w-full sm:w-max bg-[#f0c14b] hover:bg-[#ddb347] text-black font-bold py-2 px-4 rounded-full'
											onClick={handlePlacePayment}
										>
											PLACE PAYMENT
										</Button>
										<Button
											variant='destructive'
											onClick={() => handleRemoveItem(ticket.ticketId)}
											className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full'
										>
											Remove
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default CartPayment;
