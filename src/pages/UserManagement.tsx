import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getCustomers } from '../api/user/getCustomers';
import { getEvenHosts } from '../api/user/getEvenHosts';
import { LockIcon, UnlockIcon } from 'lucide-react'; // Assuming UnlockIcon is available
import Swal from 'sweetalert2';
import { lockAccount } from '../api/user/lockUser';
import { unlockAccount } from '../api/user/unlockUser';

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

const UserManagement: React.FC = () => {
	const queryClient = useQueryClient();

	// Fetch customers and event hosts
	const { data, isLoading, isError } = useQuery<User[]>({
		queryKey: ['listCustomers'],
		queryFn: getCustomers,
	});

	const { data: dataEvent } = useQuery<User[]>({
		queryKey: ['listEventHosts'],
		queryFn: getEvenHosts,
	});

	// Mutation for locking an account
	const { mutate: mutateLockAccount } = useMutation({
		mutationFn: (accountId: string) => lockAccount(accountId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listCustomers'] });
			queryClient.invalidateQueries({ queryKey: ['listEventHosts'] });
			Swal.fire({
				title: 'Success!',
				text: 'The account has been locked successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: `Failed to lock the account.`,
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	// Mutation for unlocking an account
	const { mutate: mutateUnlockAccount } = useMutation({
		mutationFn: (accountId: string) => unlockAccount(accountId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['listCustomers'] });
			queryClient.invalidateQueries({ queryKey: ['listEventHosts'] });
			Swal.fire({
				title: 'Success!',
				text: 'The account has been unlocked successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: `Failed to unlock the account.`,
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	// Format date
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// Handle lock account click
	const handleLockAccount = (accountId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This account will be locked!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, lock it!',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				mutateLockAccount(accountId);
			}
		});
	};

	// Handle unlock account click
	const handleUnlockAccount = (accountId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This account will be unlocked!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, unlock it!',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				mutateUnlockAccount(accountId);
			}
		});
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
				<h2 className='text-xl font-bold'>User</h2>
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
									{user.isLocked ? (
										<UnlockIcon
											className='text-green-500 cursor-pointer'
											size={16}
											onClick={() => handleUnlockAccount(user.id)}
										/>
									) : (
										<LockIcon
											className='text-red-500 cursor-pointer'
											size={16}
											onClick={() => handleLockAccount(user.id)}
										/>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<h2 className='mt-8 text-xl font-bold'>Event Hosts</h2>
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
									{user.isLocked ? (
										<UnlockIcon
											className='text-green-500 cursor-pointer'
											size={16}
											onClick={() => handleUnlockAccount(user.id)}
										/>
									) : (
										<LockIcon
											className='text-red-500 cursor-pointer'
											size={16}
											onClick={() => handleLockAccount(user.id)}
										/>
									)}
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
