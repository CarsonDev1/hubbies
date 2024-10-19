import axiosInstance from '../../utils/axiosIntance';

export const deleteTicket = async (id: string) => {
	const response = await axiosInstance.delete(`/ticket-events/${id}`);
	return response.data;
};
