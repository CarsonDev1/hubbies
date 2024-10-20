/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../utils/axiosIntance";

export const updateTicketApprovalStatus = async ({
  TicketEventId,
  ApprovalStatus
}: {
  TicketEventId: string;
  ApprovalStatus: 'Pending' | 'Approved' | 'Rejected';
}) => {
  try {
    const response = await axiosInstance.put(`/ticket-events/approval`, null, {
      params: {
        TicketEventId: TicketEventId,
        ApprovalStatus: ApprovalStatus,
      },
    });

    if (response.status === 204) {
      return; // Thành công, không có dữ liệu trả về
    } else {
      return response.data; // Trả về dữ liệu nếu có
    }
  } catch (error: any) {
    console.error('Error updating Ticket:', error.response?.data || error.message);

    if (error.response && error.response.status === 404) {
      throw new Error(`TicketEvent with ID ${TicketEventId} was not found.`);
    } else {
      throw new Error('An error occurred while updating the ticket approval status.');
    }
  }
};
