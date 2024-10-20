import axios from 'axios';

export async function updateOrderStatus(orderId: string, status: string, token: string) {
  const baseUrl = `https://hubbies-be.azurewebsites.net/api/orders/status?OrderId=${orderId}&Status=${status}`;

  try {
    const response = await axios.put(
      baseUrl,
      {},
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.status === 204;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}
