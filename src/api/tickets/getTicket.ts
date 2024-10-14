import axios from 'axios';

export async function getAllCategory() {
	try {
		const baseUrl = ``;

		const response = await axios.get(baseUrl, {
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
