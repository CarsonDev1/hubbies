import axios from 'axios';

export async function getOrder(Page: number, PageSize: number) {
  try {
    const baseUrl = `https://hubbies-be.azurewebsites.net/api/orders?Page=${Page}&PageSize=${PageSize}&IncludeOrderDetails=true`;

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
