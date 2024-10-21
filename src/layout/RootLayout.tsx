/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SideBarRoot from '../components/SideBarRoot/SideBarRoot';
import { RiSearch2Line, RiShoppingBag3Line } from 'react-icons/ri';
import { Camera, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import Avt from '../assets/images/avt.png';
import Logo from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContextMain';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

// Import the Dialog components
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ClockIcon, ImageIcon, MapPinIcon } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { Category } from '../pages/CategoryEvent';
import { getAllCategory } from '../api/category/getCategories';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '../components/ui/select';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { Link } from 'react-router-dom';

interface RootLayoutProps {
	children: React.ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

type FormData = {
	photo: string | null;
	host: string;
	price: number;
	time: string;
	date: string;
	place: string;
	description: string;
	category: string;
	content: string;
	quantity: number;
};

// Schema for form validation
const schema = z.object({
	photo: z.string().nullable().optional(),
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
	category: z.string().nonempty({ message: 'Category is required' }),
	content: z.string().nonempty({ message: 'Content is required' }),
	quantity: z.preprocess(
		(val) => (typeof val === 'string' ? parseInt(val, 10) : val),
		z.number().positive({ message: 'Quantity must be a positive number' })
	),
});

const RootLayout: React.FC<RootLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const { logout, user, fetchUserData } = useAuth();
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const accessToken = localStorage.getItem('accessToken') ?? '';
	const decodedRole: any = jwtDecode(accessToken);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { data, isLoading, isError } = useQuery<Category[]>({
		queryKey: ['listCategories'],
		queryFn: getAllCategory,
	});

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		setCartCount(storedCart.length);
	}, []);

	useEffect(() => {
		const handleCartUpdate = () => {
			const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
			setCartCount(storedCart.length);
		};

		window.addEventListener('cart-updated', handleCartUpdate);

		return () => {
			window.removeEventListener('cart-updated', handleCartUpdate);
		};
	}, []);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!user) {
			toast.error('You must be signed in to upload files.');
			return;
		}

		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const storageRef = ref(storage, `images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot: any) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				},
				(error: any) => {
					console.error('Upload failed:', error);
					toast.error('Upload failed');
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
						console.log('File available at', downloadURL);
						setSelectedFile(downloadURL); // Save file URL to state
						setValue('photo', downloadURL); // Set value to form
					});
				}
			);
		}
	};

	const onSubmit = async (data: FormData) => {
		try {
			const requestBody = {
				name: data.host,
				description: data.description,
				content: data.content,
				quantity: data.quantity,
				price: data.price,
				address: data.place,
				postDate: data.date + 'T' + data.time + ':00.000Z',
				image: data.photo,
				eventCategoryId: data.category,
			};

			const response = await fetch('https://hubbies-be.azurewebsites.net/api/ticket-events', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (response.ok) {
				toast.success('Ticket event created successfully');
				setIsDialogOpen(false);
			} else {
				const errorMessage = await response.text();
				console.error('Server validation error:', errorMessage);
				alert(`Failed to create event: ${errorMessage}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	useEffect(() => {
		if (!user) {
			fetchUserData();
		}
	}, [user, fetchUserData]);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<>
			<div className='flex h-full bg-[#f9f3e3]'>
				<SideBarRoot
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<main className='flex-1 w-full overflow-hidden p-2 md:p-4 lg:p-8 bg-[#f9f3e3]'>
					<div className='flex items-center justify-between mb-4 lg:hidden'>
						<Button variant='ghost' size='icon' onClick={toggleSidebar}>
							<Menu className='w-6 h-6' />
						</Button>
						<img src={Logo} alt='Logo' width={64} height={64} />
						<Button variant='ghost' size='icon'>
							<img src={Avt} alt='User' width={32} height={32} className='rounded-full' />
						</Button>
					</div>
					<div className='items-center justify-around hidden mb-6 lg:flex'>
						<div className='relative flex items-center gap-4'>
							<div className='relative'>
								<RiSearch2Line className='absolute transform -translate-y-1/2 text-[#D1B186] left-3 top-1/2' />
								<input
									type='text'
									placeholder='Search workshop'
									className='pl-5 xl:pl-10 pr-3 py-2 xl:py-4 border border-button-color rounded-full w-80 xl:w-96 bg-transparent focus:outline-none placeholder:text-[#D1B186]'
								/>
							</div>
							{decodedRole === 'EventHost' && (
								<div className='bg-[#ffca66] p-3 rounded-full' onClick={() => setIsDialogOpen(true)}>
									<Camera className='text-button-color' />
								</div>
							)}
						</div>
						<div className='flex items-center gap-6'>
							<div className='flex items-center space-x-2' onClick={logout}>
								<img src={Avt} alt='User' width={54} height={54} className='rounded-full' />
								<div className='flex flex-col gap-1'>
									{user ? (
										<div className='flex flex-col gap-1'>
											<h1>{user.userName}</h1>
											{decodedRole?.role === 'EventHost' && (
												<span className='px-4 py-0 text-white rounded-full w-fit bg-button-color'>
													Host
												</span>
											)}
										</div>
									) : (
										<p>Loading user information...</p>
									)}
								</div>
							</div>
							<Link to='/cart-payment'>
								<div className='relative'>
									<RiShoppingBag3Line className='size-6' />
									<span className='absolute bottom-0 right-0 px-2 py-1 text-xs text-white translate-x-1/2 translate-y-1/2 rounded-full bg-button-color'>
										{cartCount}
									</span>
								</div>
							</Link>
						</div>
					</div>
					<div className='w-full mx-auto'>
						{isLoading && <p>Loading categories...</p>}
						{isError && <p>Error loading categories</p>}
						{children}
						<ToastContainer />
					</div>
				</main>
				{isSidebarOpen && (
					<div className='fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden' onClick={toggleSidebar}></div>
				)}
			</div>

			{/* Dialog for Adding Ticket */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
									<span className='text-[#A0522D]'>{selectedFile ? selectedFile : 'Add photos'}</span>
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
						<div className='space-y-2'>
							<Label htmlFor='category' className='text-[#8B4513]'>
								Category
							</Label>
							<Select onValueChange={(value) => setValue('category', value)}>
								<SelectTrigger className='bg-[#FFE4B5] border-[#D2B48C]'>
									<SelectValue placeholder='Select a category' />
								</SelectTrigger>
								<SelectContent>
									{data?.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
								{errors.category && <p className='text-red-600'>{errors.category.message}</p>}
							</Select>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='content' className='text-[#8B4513]'>
								Content
							</Label>
							<Textarea
								id='content'
								className='bg-[#FFE4B5] border-[#D2B48C]'
								placeholder='Write the content of the event'
								rows={4}
								{...register('content')}
							/>
							{errors.content && <p className='text-red-600'>{errors.content.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='quantity' className='text-[#8B4513]'>
								Quantity
							</Label>
							<Input
								id='quantity'
								className='bg-[#FFE4B5] border-[#D2B48C]'
								placeholder='Enter the quantity'
								type='number'
								{...register('quantity')}
							/>
							{errors.quantity && <p className='text-red-600'>{errors.quantity.message}</p>}
						</div>
						<DialogFooter>
							<Button type='submit' className='bg-[#FFA500] hover:bg-[#FF8C00] text-white'>
								Upload
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default RootLayout;
