import axiosInstance from '../../utils/axiosIntance';

export const updateCategory = async ({ id, categoryDetails }: { id: string; categoryDetails: FormData }) => {
	try {
		const response = await axiosInstance.put(`/event-categories/${id}`, categoryDetails, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 204) {
			return;
		} else {
			return response.data;
		}
	} catch (error) {
		console.error('Error updating category:', error);
		throw new Error('Error updating category');
	}
};
