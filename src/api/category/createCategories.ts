import axiosInstance from '../../utils/axiosIntance';

export const createCategory = async (categoryDetails: FormData) => {
	try {
		const response = await axiosInstance.post('/event-categories', categoryDetails, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch {
		throw new Error('Error creating category');
	}
};
