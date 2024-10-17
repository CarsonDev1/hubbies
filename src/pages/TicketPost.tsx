/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getTicketEvents } from '../api/tickets/getTicket';
import { useAuth } from '../contexts/AuthContextMain';
import { EditIcon, TrashIcon } from 'lucide-react';

export interface TicketPost {
	id: string;
	name: string;
	description: string;
	content: string;
	quantity: number;
	price: number;
	status: string;
	approvalStatus: string;
	address: string;
	postDate: string;
	image: string;
	eventCategoryId: string;
	eventHostId: string;
	eventCategory: null | { name: string };
	feedbacks: { content: string }[];
}

const TicketPost: React.FC = () => {
	const { user } = useAuth();
	const eventHostId = user?.id ?? '';
	const page = 1;
	const pageSize = 10;

	const { data, isLoading, isError } = useQuery({
		queryKey: ['listTickets', eventHostId, page, pageSize],
		queryFn: () => getTicketEvents(eventHostId, page, pageSize),
		select: (response) => response.data,
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error loading events...</p>;
	}

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>Event Details</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Content</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Approval Status</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Post Date</TableHead>
						<TableHead>Image</TableHead>
						<TableHead>Event Category</TableHead>
						<TableHead>Feedbacks</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((event: any) => (
						<TableRow key={event.id}>
							<TableCell>{event.name}</TableCell>
							<TableCell
								style={{
									maxWidth: '150px',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{event.description}
							</TableCell>
							<TableCell
								style={{
									maxWidth: '150px',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{event.content}
							</TableCell>
							<TableCell>{event.quantity}</TableCell>
							<TableCell>{event.price}</TableCell>
							<TableCell>{event.status}</TableCell>
							<TableCell>{event.approvalStatus}</TableCell>
							<TableCell>{event.address}</TableCell>
							<TableCell>{new Date(event.postDate).toLocaleDateString()}</TableCell>
							<TableCell>
								<img src={event.image} alt='Event' width={50} />
							</TableCell>
							<TableCell>{event.eventCategory?.name || 'No category'}</TableCell>
							<TableCell>
								{event.feedbacks.length > 0 ? event.feedbacks[0].content : 'No feedbacks'}
							</TableCell>
							<TableCell>
								<EditIcon className='cursor-pointer' />
								<TrashIcon className='cursor-pointer' />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TicketPost;
