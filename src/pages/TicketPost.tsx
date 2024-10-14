import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../components/ui/dialog';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { CalendarIcon, ClockIcon, ImageIcon, MapPinIcon } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
	photo: File | null;
	host: string;
	price: number;
	time: string;
	date: string;
	place: string;
	description: string;
};

const schema = z.object({
	photo: z.instanceof(File).nullable().optional(),
	host: z.string().nonempty({ message: 'Host name is required' }),
	price: z.preprocess(
		(val) => (typeof val === 'string' ? parseFloat(val) : val),
		z.number().positive({ message: 'Price must be a positive number' })
	),
	time: z.string().nonempty({ message: 'Time is required' }),
	date: z.string().nonempty({ message: 'Date is required' }),
	place: z.string().nonempty({ message: 'Place is required' }),
	description: z
		.string()
		.min(50, 'Description must be at least 50 characters')
		.max(200, 'Description must be no more than 200 characters'),
});

const TicketPost: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedFile(event.target.files[0]);
			setValue('photo', event.target.files[0]);
		}
	};

	const token = localStorage.getItem('token');

	const onSubmit = async (data: FormData) => {
		try {
			const eventData = {
				name: data.host,
				description: data.description,
				content: 'Event full of monkes doing art and many more...',
				quantity: 50,
				price: data.price,
				address: data.place,
				postDate: data.date + 'T' + data.time + ':00.000Z',
				image: 'https://monke-cofi.com/image.jpg',
				eventCategoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			};

			const response = await fetch('https://hubbies-be.azurewebsites.net/api/ticket-events', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(eventData),
			});

			if (response.ok) {
				alert('Ticket event created successfully');
				setIsOpen(false);
			} else {
				const errorMessage = await response.text();
				console.error('Server validation error:', errorMessage);
				alert(`Failed to create event: ${errorMessage}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const eventData = {
		id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		name: 'Cofi event',
		description: 'Monkes doing art',
		content: 'Event full of monkes doing art and many more...',
		quantity: 50,
		price: 100000,
		status: 'Available',
		approvalStatus: 'Pending',
		address: 'Q9, HCM',
		postDate: '2024-10-14T09:26:25.800Z',
		image: 'https://monke-cofi.com/image.jpg',
		eventCategoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		eventHostId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		eventCategory: {
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			address: 'HCM',
			name: 'Cofi',
		},
		feedbacks: [
			{
				ticketEventId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
				userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
				content: 'Event full of monkes, love it',
				rating: 5,
				status: 'Pending',
			},
		],
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>Event Details</h2>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button className='bg-[#FFA500] hover:bg-[#FF8C00] text-white'>Add Ticket</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFF8E7] border-[#D2B48C]'>
						<DialogHeader>
							<DialogTitle className='text-[#8B4513]'>Add New Ticket</DialogTitle>
							<DialogDescription className='text-[#A0522D]'>
								Fill in the details below to add a new ticket.
							</DialogDescription>
						</DialogHeader>
						<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
							<div className='space-y-2'>
								<Label htmlFor='photo' className='text-[#8B4513]'>
									Event Photo
								</Label>
								<div className='relative'>
									<Input
										id='photo'
										type='file'
										accept='image/*'
										className='sr-only'
										onChange={handleFileChange}
									/>
									<Label
										htmlFor='photo'
										className='flex items-center justify-center border-2 border-dashed border-[#D2B48C] rounded-md p-4 cursor-pointer hover:bg-[#FFE4B5]'
									>
										<ImageIcon className='mr-2 text-[#A0522D]' size={20} />
										<span className='text-[#A0522D]'>
											{selectedFile ? selectedFile.name : 'Add photos'}
										</span>
									</Label>
									{errors.photo && <p className='text-red-600'>{errors.photo.message}</p>}
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='host' className='text-[#8B4513]'>
									Name of Host
								</Label>
								<Input
									id='host'
									className='bg-[#FFE4B5] border-[#D2B48C]'
									placeholder="Your host's name"
									{...register('host')}
								/>
								{errors.host && <p className='text-red-600'>{errors.host.message}</p>}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='price' className='text-[#8B4513]'>
									Ticket Price
								</Label>
								<Input
									id='price'
									className='bg-[#FFE4B5] border-[#D2B48C]'
									placeholder='$$$'
									type='number'
									{...register('price')}
								/>
								{errors.price && <p className='text-red-600'>{errors.price.message}</p>}
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='time' className='text-[#8B4513]'>
										Time
									</Label>
									<div className='relative'>
										<Input
											id='time'
											type='time'
											className='bg-[#FFE4B5] border-[#D2B48C] pl-10'
											{...register('time')}
										/>
										<ClockIcon
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D]'
											size={16}
										/>
									</div>
									{errors.time && <p className='text-red-600'>{errors.time.message}</p>}
								</div>
								<div className='space-y-2'>
									<Label htmlFor='date' className='text-[#8B4513]'>
										Date
									</Label>
									<div className='relative'>
										<Input
											id='date'
											type='date'
											className='bg-[#FFE4B5] border-[#D2B48C] pl-10'
											{...register('date')}
										/>
										<CalendarIcon
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D]'
											size={16}
										/>
									</div>
									{errors.date && <p className='text-red-600'>{errors.date.message}</p>}
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='place' className='text-[#8B4513]'>
									Place
								</Label>
								<div className='relative'>
									<Input
										id='place'
										className='bg-[#FFE4B5] border-[#D2B48C] pl-10'
										placeholder='Add your Workshop Address/ Google map URL'
										{...register('place')}
									/>
									<MapPinIcon
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D]'
										size={16}
									/>
								</div>
								{errors.place && <p className='text-red-600'>{errors.place.message}</p>}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='description' className='text-[#8B4513]'>
									Detail description
								</Label>
								<Textarea
									id='description'
									className='bg-[#FFE4B5] border-[#D2B48C]'
									placeholder='Write about 50-200 characters to describe your workshop'
									rows={4}
									{...register('description')}
								/>
								{errors.description && <p className='text-red-600'>{errors.description.message}</p>}
							</div>
							<DialogFooter>
								<Button type='submit' className='bg-[#FFA500] hover:bg-[#FF8C00] text-white'>
									Upload
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Event ID</TableHead>
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
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>{eventData.id}</TableCell>
						<TableCell>{eventData.name}</TableCell>
						<TableCell>{eventData.description}</TableCell>
						<TableCell>{eventData.content}</TableCell>
						<TableCell>{eventData.quantity}</TableCell>
						<TableCell>{eventData.price}</TableCell>
						<TableCell>{eventData.status}</TableCell>
						<TableCell>{eventData.approvalStatus}</TableCell>
						<TableCell>{eventData.address}</TableCell>
						<TableCell>{new Date(eventData.postDate).toLocaleDateString()}</TableCell>
						<TableCell>
							<img src={eventData.image} alt='Event' width={50} />
						</TableCell>
						<TableCell>{eventData.eventCategory.name}</TableCell>
						<TableCell>
							{eventData.feedbacks.length > 0 ? eventData.feedbacks[0].content : 'No feedbacks'}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default TicketPost;
