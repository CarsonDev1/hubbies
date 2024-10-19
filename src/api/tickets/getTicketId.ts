import axiosInstance from "../../utils/axiosIntance";

export async function getTicketEventsById({ id }: { id: string }) {
  try {
    const response = await axiosInstance.get(`/ticket-events/${id}`);
    if (response.status === 204) {
      return;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error updating Ticket:', error);
    throw new Error('Error updating Ticket');
  }
}