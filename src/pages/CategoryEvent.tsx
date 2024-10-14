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
import { MapPinIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '../api/category/getCategories';

type FormData = {
	host: string;
	place: string;
};

export interface Category {
	id: string;
	address: string;
	name: string;
}

const schema = z.object({
	host: z.string().nonempty({ message: 'Host name is required' }),
	place: z.string().nonempty({ message: 'Place is required' }),
});

const CategoryEvent: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { data, isLoading, isError } = useQuery<Category[]>({
		queryKey: ['listCategories'],
		queryFn: getAllCategory,
	});

	const token = localStorage.getItem('token');

	const onSubmit = async (data: FormData) => {
		try {
			const eventData = {
				name: data.host,
				address: data.place,
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
				alert('Category event created successfully');
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

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error occurred</div>;
	}

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>Category Details</h2>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button className='bg-[#FFA500] hover:bg-[#FF8C00] text-white'>Add Category</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-3xl bg-[#FFF8E7] border-[#D2B48C]'>
						<DialogHeader>
							<DialogTitle className='text-[#8B4513]'>Add New Category</DialogTitle>
							<DialogDescription className='text-[#A0522D]'>
								Fill in the details below to add a new category.
							</DialogDescription>
						</DialogHeader>
						<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
							<div className='space-y-2'>
								<Label htmlFor='host' className='text-[#8B4513]'>
									Name of Category
								</Label>
								<Input
									id='host'
									className='bg-[#FFE4B5] border-[#D2B48C]'
									placeholder="Category's name"
									{...register('host')}
								/>
								{errors.host && <p className='text-red-600'>{errors.host.message}</p>}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='place' className='text-[#8B4513]'>
									Category Address
								</Label>
								<div className='relative'>
									<Input
										id='place'
										className='bg-[#FFE4B5] border-[#D2B48C] pl-10'
										placeholder='Add address'
										{...register('place')}
									/>
									<MapPinIcon
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D]'
										size={16}
									/>
								</div>
								{errors.place && <p className='text-red-600'>{errors.place.message}</p>}
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
						<TableHead>Category ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Address</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((category) => (
						<TableRow key={category.id}>
							<TableCell>{category.id}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell>{category.address}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CategoryEvent;
