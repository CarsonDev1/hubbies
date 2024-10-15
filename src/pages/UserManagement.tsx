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
import { deleteCategory } from '../api/category/deleteCategories';
import { getCustomers } from '../api/user/getCustomers';
import { getEvenHosts } from '../api/user/getEvenHosts';

type UserFormData = {
	name: string;
	address: string;
};

export interface User {
	id: string;
	userName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dob: string;
	isLocked: boolean;
	address: string;
}

const schema = z.object({
	name: z.string().nonempty({ message: 'Name is required' }),
	address: z.string().nonempty({ message: 'Address is required' }),
});

const UserManagement: React.FC = () => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [currentCategory, setCurrentCategory] = useState<User | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm<UserFormData>({
		resolver: zodResolver(schema),
		defaultValues: { name: '', address: '' },
	});

	const { data, isLoading, isError } = useQuery<User[]>({
		queryKey: ['listCustomers'],
		queryFn: getCustomers,
	});

	const { data: dataEvent } = useQuery<User[]>({
		queryKey: ['listEventHosts'],
		queryFn: getEvenHosts,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error occurred</div>;
	}

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>User Details</h2>
			</div>

			<Table className='min-w-full bg-transparent border border-gray-200'>
				<TableHeader className='bg-primary-color'>
					<TableRow>
						<TableHead className='px-4 py-2 border-b'>Username</TableHead>
						<TableHead className='px-4 py-2 border-b'>Last Name</TableHead>
						<TableHead className='px-4 py-2 border-b'>Email</TableHead>
						<TableHead className='px-4 py-2 border-b'>Phone Number</TableHead>
						<TableHead className='px-4 py-2 border-b'>Date of Birth</TableHead>
						<TableHead className='px-4 py-2 border-b'>Is Locked</TableHead>
						<TableHead className='px-4 py-2 border-b'>Address</TableHead>
						<TableHead className='px-4 py-2 border-b'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((user) => (
						<TableRow key={user.id} className='hover:bg-gray-50'>
							<TableCell className='px-4 py-2 border-b'>{user.userName}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.lastName}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.email}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.phoneNumber}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{formatDate(user.dob)}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.isLocked ? 'Yes' : 'No'}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.address}</TableCell>
							<TableCell className='px-4 py-2 border-b'>
								<div className='flex space-x-4'>
									<TrashIcon className='cursor-pointer text-red-500' size={16} />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<h2 className='text-xl font-bold mt-8'>Event Hosts</h2>
			<Table className='min-w-full bg-transparent border border-gray-200'>
				<TableHeader className='bg-primary-color'>
					<TableRow>
						<TableHead className='px-4 py-2 border-b'>Username</TableHead>
						<TableHead className='px-4 py-2 border-b'>Last Name</TableHead>
						<TableHead className='px-4 py-2 border-b'>Email</TableHead>
						<TableHead className='px-4 py-2 border-b'>Phone Number</TableHead>
						<TableHead className='px-4 py-2 border-b'>Date of Birth</TableHead>
						<TableHead className='px-4 py-2 border-b'>Is Locked</TableHead>
						<TableHead className='px-4 py-2 border-b'>Address</TableHead>
						<TableHead className='px-4 py-2 border-b'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dataEvent?.map((user) => (
						<TableRow key={user.id} className='hover:bg-gray-50'>
							<TableCell className='px-4 py-2 border-b'>{user.userName}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.lastName}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.email}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.phoneNumber}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{formatDate(user.dob)}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.isLocked ? 'Yes' : 'No'}</TableCell>
							<TableCell className='px-4 py-2 border-b'>{user.address}</TableCell>
							<TableCell className='px-4 py-2 border-b'>
								<div className='flex space-x-4'>
									<TrashIcon className='cursor-pointer text-red-500' size={16} />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UserManagement;
