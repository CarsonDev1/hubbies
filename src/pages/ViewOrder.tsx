/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import Swal from 'sweetalert2';
import { getOrder } from '../api/order/getOrder';
import { updateOrderStatus } from '../api/order/updateOrderStatus';

const ViewOrder: React.FC = () => {
	const queryClient = useQueryClient();
	const page = 1;
	const pageSize = 10;
	const token = localStorage.getItem('accessToken');

	// Fetch orders
	const { data, isLoading, isError } = useQuery({
		queryKey: ['listOrders', page, pageSize],
		queryFn: () => getOrder(page, pageSize),
		select: (response) => response.data,
	});

	// Mutation for updating order status
	const { mutate: mutateUpdateStatus } = useMutation({
		mutationFn: ({ orderId, status }: { orderId: string; status: string }) => {
			if (!token) {
				throw new Error('Access token is missing');
			}
			return updateOrderStatus(orderId, status, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listOrders'] });
			Swal.fire({
				title: 'Success!',
				text: 'Order status updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: (error: any) => {
			Swal.fire({
				title: 'Error!',
				text: `There was an error updating the order status. Error: ${error.message || 'Unknown error'}`,
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleUpdateStatus = (orderId: string, status: string) => {
		mutateUpdateStatus({ orderId, status });
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error loading orders...</p>;
	}

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>Order Details</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Total Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>User ID</TableHead>
						<TableHead>Order Details</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((order: any) => (
						<TableRow key={order.id}>
							<TableCell>{order.id}</TableCell>
							<TableCell>{order.totalPrice}</TableCell>
							<TableCell>{order.status}</TableCell>
							<TableCell>{order.address}</TableCell>
							<TableCell>{order.userId}</TableCell>
							<TableCell>
								<ul>
									{order.orderDetails.map((detail: any) => (
										<li key={detail.orderId}>
											Event ID: {detail.ticketEventId}, Location: {detail.location}, Quantity:{' '}
											{detail.quantity}, Price: {detail.price}
										</li>
									))}
								</ul>
							</TableCell>
							<TableCell>
								<button
									onClick={() => handleUpdateStatus(order.id, 'Finished')}
									className='px-2 py-1 text-white bg-blue-500 rounded'
								>
									Mark as Finished
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ViewOrder;
