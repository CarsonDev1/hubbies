/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MapPinIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategory } from '../api/category/getCategories';
import { createCategory } from '../api/category/createCategories';
import { updateCategory } from '../api/category/updateCategories';
import { deleteCategory } from '../api/category/deleteCategories';

type CategoryFormData = {
	name: string;
	address: string;
};

export interface Category {
	id: string;
	address: string;
	name: string;
}

const schema = z.object({
	name: z.string().nonempty({ message: 'Name is required' }),
	address: z.string().nonempty({ message: 'Address is required' }),
});

const CategoryEvent: React.FC = () => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(schema),
		defaultValues: { name: '', address: '' },
	});

	const { data, isLoading, isError } = useQuery<Category[]>({
		queryKey: ['listCategories'],
		queryFn: getAllCategory,
	});

	const { mutate: mutateCreateCategory } = useMutation({
		mutationFn: async (categoryDetails: CategoryFormData) => {
			const formData = new FormData();
			formData.append('name', categoryDetails.name);
			formData.append('address', categoryDetails.address);

			await createCategory(formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listCategories'] });
			Swal.fire({
				title: 'Success!',
				text: 'Category created successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsOpen(false);
			reset();
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: 'There was an error creating the category.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const { mutate: mutateUpdateCategory } = useMutation({
		mutationFn: async ({
			id,
			categoryDetails,
		}: {
			id: string;
			categoryDetails: { name: string; address: string };
		}) => {
			const formData = new FormData();
			formData.append('name', categoryDetails.name);
			formData.append('address', categoryDetails.address);

			await updateCategory({ id, categoryDetails: formData });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listCategories'] });
			Swal.fire({
				title: 'Success!',
				text: 'Category updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsOpen(false);
			reset();
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: 'There was an error updating the category.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const { mutate: mutateDeleteCategory } = useMutation({
		mutationFn: async (id: string) => {
			try {
				await deleteCategory(id);
			} catch (error) {
				console.error('Error during category deletion:', error);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['listCategories'] as unknown as InvalidateQueryFilters);
			Swal.fire({
				title: 'Success!',
				text: 'Category deleted successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: (error: any) => {
			console.error('Error deleting category:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error deleting the category.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleDelete = (id: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		}).then((result) => {
			if (result.isConfirmed) {
				mutateDeleteCategory(id);
			}
		});
	};

	// Form submission handler
	const onSubmit = (data: CategoryFormData) => {
		// If adding a new category
		if (isAdding) {
			mutateCreateCategory(data);
		} else if (currentCategory) {
			// If updating an existing category
			mutateUpdateCategory({
				id: currentCategory.id,
				categoryDetails: data,
			});
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
						<Button
							onClick={() => {
								setIsAdding(true);
								setIsOpen(true);
								setCurrentCategory(null); // Reset current category
								reset(); // Reset form data when opening the dialog
							}}
							className='bg-[#FFA500] hover:bg-[#FF8C00] text-white'
						>
							Add Category
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-3xl bg-[#FFF8E7] border-[#D2B48C]'>
						<DialogHeader>
							<DialogTitle className='text-[#8B4513]'>
								{isAdding ? 'Add New Category' : 'Edit Category'}
							</DialogTitle>
							<DialogDescription className='text-[#A0522D]'>
								Fill in the details below to {isAdding ? 'add a new category' : 'edit the category'}.
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
									{...register('name')}
								/>
								{errors.name && <p className='text-red-600'>{errors.name.message}</p>}
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
										{...register('address')}
									/>
									<MapPinIcon
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D]'
										size={16}
									/>
								</div>
								{errors.address && <p className='text-red-600'>{errors.address.message}</p>}
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
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((category) => (
						<TableRow key={category.id}>
							<TableCell>{category.id}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell>{category.address}</TableCell>
							<TableCell>
								<div className='flex space-x-4'>
									<EditIcon
										className='cursor-pointer'
										size={16}
										onClick={() => {
											setIsAdding(false);
											setIsOpen(true);
											setCurrentCategory(category);
											setValue('name', category.name);
											setValue('address', category.address);
										}}
									/>
									<TrashIcon
										className='cursor-pointer'
										size={16}
										onClick={() => handleDelete(category.id)}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CategoryEvent;
