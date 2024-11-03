import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

interface OrderStatus {
	orderId: string;
	status: string;
}

interface Notification {
	id: string;
	title: string;
	content: string;
	isRead: boolean;
	from: string;
	sentAt: string;
}

export default function PaymentFail() {
	const paymentReference = localStorage.getItem('paymentReference');
	const token = localStorage.getItem('token');

	// Mutation to fetch order status
	const { mutate: mutateOrderStatus } = useMutation({
		mutationFn: async () => {
			if (!paymentReference || !token) {
				throw new Error('Missing payment reference or auth token.');
			}
			const response = await axios.post<OrderStatus>(
				`https://hubbies-be.azurewebsites.net/api/orders/order-status?paymentReference=${paymentReference}&paymentType=PayOS`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						accept: 'application/json',
					},
				}
			);
			return response.data;
		},
		onSuccess: (data) => {
			if (data.status !== 'Canceled') {
				console.log('Order status fetched successfully. Fetching notifications.');
				refetchNotifications(); // Trigger notifications fetch on order status success
			}
		},
		onError: (error) => {
			console.error('Error fetching order status:', error);
		},
	});

	// Fetch notifications
	const {
		data: notifications = [],
		refetch: refetchNotifications,
		isLoading: notificationsLoading,
		error: notificationsError,
	} = useQuery<Notification[]>({
		queryKey: ['notifications'],
		queryFn: async () => {
			if (!token) {
				throw new Error('Missing auth token.');
			}
			const response = await axios.get<Notification[]>('https://hubbies-be.azurewebsites.net/api/notifications', {
				headers: {
					Authorization: `Bearer ${token}`,
					accept: 'application/json',
				},
			});
			return response.data;
		},
		enabled: false, // Will be triggered by refetch after order status success
	});

	// Execute the order status mutation on component mount
	useEffect(() => {
		if (paymentReference) {
			console.log('Calling mutateOrderStatus');
			mutateOrderStatus();
		}
	}, []);

	// Get only the first notification if it exists
	const firstNotification = notifications[0];

	return (
		<div className='min-h-screen flex flex-col bg-[#FFE6E6]'>
			<div className='flex flex-col items-center justify-center flex-grow'>
				<div className='w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg'>
					<div className='mb-6 text-red-500'>
						<svg className='w-16 h-16 mx-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</div>
					<h2 className='mb-4 text-3xl font-bold text-red-600'>Payment Failed</h2>
					<p className='mb-4 text-gray-600'>
						We’re sorry, but your payment was not successful. Please check your payment details or try a
						different payment method.
					</p>
					{notificationsLoading && <p className='text-gray-500'>Loading notification...</p>}
					{notificationsError && <p className='text-red-500'>Error loading notification.</p>}
					{firstNotification && (
						<div className='flex flex-col gap-3 mb-6 bg-[#FFF0F0] p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-700'>{firstNotification.title}</h3>
							<p className='text-gray-600'>{firstNotification.content}</p>
							<p className='text-gray-600'>
								<strong>From:</strong> {firstNotification.from}
							</p>
							<p className='text-gray-600'>
								<strong>Sent At:</strong> {new Date(firstNotification.sentAt).toLocaleString()}
							</p>
						</div>
					)}
					<div className='flex flex-col gap-4'>
						<Link
							to='/'
							className='inline-block bg-[#FF6B6B] text-white px-6 py-2 rounded-full hover:bg-[#FF8787] transition-colors'
						>
							Back to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
