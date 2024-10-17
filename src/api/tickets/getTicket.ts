import axios from 'axios';

export async function getTicketEvents(EventHostId: string, Page: number, PageSize: number) {
	try {
		const baseUrl = `https://hubbies-be.azurewebsites.net/api/ticket-events?EventHostId=${EventHostId}&Page=${Page}&PageSize=${PageSize}`;

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