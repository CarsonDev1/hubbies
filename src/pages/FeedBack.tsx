import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const FeedBack: React.FC = () => {
	const eventData = {
		ticketEventId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		content: 'Event full of monkes, love it',
		rating: 5,
		status: 'Pending',
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>Feedback Details</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Ticket Event ID</TableHead>
						<TableHead>User ID</TableHead>
						<TableHead>Content</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>{eventData.ticketEventId}</TableCell>
						<TableCell>{eventData.userId}</TableCell>
						<TableCell>{eventData.content}</TableCell>
						<TableCell>{eventData.rating}</TableCell>
						<TableCell>{eventData.status}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default FeedBack;
