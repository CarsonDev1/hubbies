/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getTicketEvents } from '../api/tickets/getTicket';
import { useAuth } from '../contexts/AuthContextMain';
import { EditIcon, TrashIcon } from 'lucide-react';
import { updateTicket } from '../api/tickets/updateTicket';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { getAllCategory } from '../api/category/getCategories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Import Select từ Shadcn UI
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase';

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
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const eventHostId = user?.id ?? '';
	const page = 1;
	const pageSize = 10;

	const [open, setOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<TicketPost | null>(null);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
	const [ticketDetails, setTicketDetails] = useState({
		name: '',
		description: '',
		content: '',
		quantity: 0,
		price: 0,
		address: '',
		postDate: '',
		image: '',
	});

	const { data, isLoading, isError } = useQuery({
		queryKey: ['listTickets', eventHostId, page, pageSize],
		queryFn: () => getTicketEvents(eventHostId, page, pageSize),
		select: (response) => response.data,
	});

	const { data: CategoryData } = useQuery({
		queryKey: ['listCategories'],
		queryFn: getAllCategory,
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const storageRef = ref(storage, `images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				},
				(error) => {
					console.error('Upload failed:', error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
						setSelectedFile(downloadURL);
					});
				}
			);
		}
	};

	const { mutate: mutateUpdateTicket } = useMutation({
		mutationFn: async (ticketData: { id: string; ticketDetails: FormData }) => {
			try {
				const response = await updateTicket(ticketData);
				return response;
			} catch (error) {
				// Log lỗi chi tiết để debug
				console.error('Error in updating ticket:', error);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listTickets'] });
			Swal.fire({
				title: 'Success!',
				text: 'Ticket updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setOpen(false);
		},
		onError: (error: any) => {
			// Log chi tiết lỗi trả về từ server
			console.error('Error updating ticket:', error);

			Swal.fire({
				title: 'Error!',
				text: `There was an error updating the ticket. Error: ${error.message || 'Unknown error'}`,
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleEditClick = (ticket: TicketPost) => {
		setSelectedTicket(ticket);
		setTicketDetails({
			name: ticket.name,
			description: ticket.description,
			content: ticket.content,
			quantity: ticket.quantity,
			price: ticket.price,
			address: ticket.address,
			postDate: ticket.postDate,
			image: ticket.image,
		});
		setSelectedCategoryId(ticket.eventCategoryId);
		setOpen(true);
	};

	const handleSubmit = () => {
		if (selectedTicket) {
			const formData = new FormData();
			formData.append('name', ticketDetails.name);
			formData.append('description', ticketDetails.description);
			formData.append('content', ticketDetails.content);
			formData.append('quantity', ticketDetails.quantity.toString());
			formData.append('price', ticketDetails.price.toString());
			formData.append('address', ticketDetails.address);
			formData.append('postDate', ticketDetails.postDate);
			formData.append('image', selectedFile ?? ticketDetails.image);
			formData.append('eventCategoryId', selectedCategoryId ?? '');

			mutateUpdateTicket({
				id: selectedTicket.id,
				ticketDetails: formData,
			});
		}
	};

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
					{data?.map((event: TicketPost) => (
						<TableRow key={event.id}>
							<TableCell>{event.name}</TableCell>
							<TableCell>{event.description}</TableCell>
							<TableCell>{event.content}</TableCell>
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
								<EditIcon className='cursor-pointer' onClick={() => handleEditClick(event)} />
								<TrashIcon className='cursor-pointer' />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFF8E7] border-[#D2B48C] shadow-lg rounded-lg'>
					<h2 className='text-[#8B4513] font-bold text-2xl mb-4'>Edit Ticket</h2>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4'>
							<div>
								<label htmlFor='name' className='text-[#8B4513]'>
									Name
								</label>
								<Input
									id='name'
									value={ticketDetails.name}
									onChange={(e) => setTicketDetails({ ...ticketDetails, name: e.target.value })}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='description' className='text-[#8B4513]'>
									Description
								</label>
								<Input
									id='description'
									value={ticketDetails.description}
									onChange={(e) =>
										setTicketDetails({ ...ticketDetails, description: e.target.value })
									}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='content' className='text-[#8B4513]'>
									Content
								</label>
								<Input
									id='content'
									value={ticketDetails.content}
									onChange={(e) => setTicketDetails({ ...ticketDetails, content: e.target.value })}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='quantity' className='text-[#8B4513]'>
									Quantity
								</label>
								<Input
									id='quantity'
									type='number'
									value={ticketDetails.quantity}
									onChange={(e) =>
										setTicketDetails({ ...ticketDetails, quantity: Number(e.target.value) })
									}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='price' className='text-[#8B4513]'>
									Price
								</label>
								<Input
									id='price'
									type='number'
									value={ticketDetails.price}
									onChange={(e) =>
										setTicketDetails({ ...ticketDetails, price: Number(e.target.value) })
									}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='address' className='text-[#8B4513]'>
									Address
								</label>
								<Input
									id='address'
									value={ticketDetails.address}
									onChange={(e) => setTicketDetails({ ...ticketDetails, address: e.target.value })}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='postDate' className='text-[#8B4513]'>
									Post Date
								</label>
								<Input
									id='postDate'
									type='date'
									value={ticketDetails.postDate}
									onChange={(e) => setTicketDetails({ ...ticketDetails, postDate: e.target.value })}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='image' className='text-[#8B4513]'>
									Image
								</label>
								<Input
									id='image'
									type='file'
									onChange={handleFileChange}
									className='bg-[#FFE4B5] border-[#D2B48C]'
								/>
							</div>

							<div>
								<label htmlFor='category' className='text-[#8B4513]'>
									Category
								</label>
								<Select
									onValueChange={(value) => setSelectedCategoryId(value)}
									value={selectedCategoryId ?? undefined}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select category' />
									</SelectTrigger>
									<SelectContent>
										{CategoryData?.map((category: { id: string; name: string }) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button type='submit' className='mt-4 bg-[#FFA500] hover:bg-[#FF8C00] text-white'>
							Update
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TicketPost;
