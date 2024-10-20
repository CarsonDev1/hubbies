import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { updateAccount } from '../api/user/updateUser';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase'; // Ensure Firebase is properly configured

const Profile: React.FC = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		address: '',
		dob: '',
		phoneNumber: '',
		avatar: '',
	});
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);

	const { mutate: mutateUpdateAccount } = useMutation({
		mutationFn: (accountData: typeof formData) => updateAccount(accountData),
		onSuccess: () => {
			Swal.fire({
				title: 'Success!',
				text: 'Account information updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: `Failed to update the account.`,
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handle file upload for avatar
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const storageRef = ref(storage, `avatars/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(progress);
				},
				(error) => {
					console.error('Upload failed:', error);
					Swal.fire({
						title: 'Error!',
						text: `Failed to upload image: ${error.message}`,
						icon: 'error',
						confirmButtonText: 'OK',
					});
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
						setSelectedFile(downloadURL);
						setFormData({ ...formData, avatar: downloadURL });
						Swal.fire({
							title: 'Success!',
							text: 'Image uploaded successfully.',
							icon: 'success',
							confirmButtonText: 'OK',
						});
					});
				}
			);
		}
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutateUpdateAccount({ ...formData, avatar: selectedFile || formData.avatar });
	};

	return (
		<form onSubmit={handleSubmit} className='p-4'>
			<div className='mb-4'>
				<label htmlFor='firstName' className='block mb-2'>
					First Name
				</label>
				<input
					type='text'
					id='firstName'
					name='firstName'
					value={formData.firstName}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300'
					required
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='lastName' className='block mb-2'>
					Last Name
				</label>
				<input
					type='text'
					id='lastName'
					name='lastName'
					value={formData.lastName}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300'
					required
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='address' className='block mb-2'>
					Address
				</label>
				<input
					type='text'
					id='address'
					name='address'
					value={formData.address}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300'
					required
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='dob' className='block mb-2'>
					Date of Birth
				</label>
				<input
					type='date'
					id='dob'
					name='dob'
					value={formData.dob}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300'
					required
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='phoneNumber' className='block mb-2'>
					Phone Number
				</label>
				<input
					type='text'
					id='phoneNumber'
					name='phoneNumber'
					value={formData.phoneNumber}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300'
					required
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='avatar' className='block mb-2'>
					Avatar
				</label>
				<input
					type='file'
					id='avatar'
					onChange={handleFileChange}
					className='w-full p-2 border border-gray-300'
				/>
				{uploadProgress > 0 && (
					<div className='mt-2'>
						<progress value={uploadProgress} max='100'>
							{uploadProgress}%
						</progress>
					</div>
				)}
				{selectedFile && <img src={selectedFile} alt='Avatar' className='mt-4' width='100' />}
			</div>

			<button type='submit' className='px-4 py-2 text-white bg-blue-500 rounded'>
				Update Account
			</button>
		</form>
	);
};

export default Profile;
