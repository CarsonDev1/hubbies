import axiosInstance from '../../utils/axiosIntance';

interface OrderDetail {
  ticketEventId: string;
  location: string;
  preferredTime: string;
  quantity: number;
}

interface FormData {
  address: string;
  orderDetails: OrderDetail[];
}

export const createOrder = async (orderDetails: FormData) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.post('/orders', orderDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    throw new Error('Error creating order');
  }
};
