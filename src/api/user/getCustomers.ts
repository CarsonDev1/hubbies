import axiosInstance from '../../utils/axiosIntance';

export async function getCustomers() {
	try {
		const response = await axiosInstance.get('/accounts/customers', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
