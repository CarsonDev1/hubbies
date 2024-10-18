import axiosInstance from '../../utils/axiosIntance';

export const updateTicket = async ({ id, ticketDetails }: { id: string; ticketDetails: FormData }) => {
  try {
    const response = await axiosInstance.put(`/ticket-events/${id}`, ticketDetails, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 204) {
      return;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error updating Ticket:', error);
    throw new Error('Error updating Ticket');
  }
};