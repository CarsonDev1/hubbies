import axiosInstance from '../../utils/axiosIntance';

export async function getEvenHosts() {
	try {
		const response = await axiosInstance.get('/accounts/event-hosts', {
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
