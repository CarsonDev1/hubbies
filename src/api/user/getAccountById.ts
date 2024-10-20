import axiosInstance from "../../utils/axiosIntance";

// Define the type for the account data
interface Account {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  dob: string;
  lockoutEnd: string;
  isLocked: boolean;
  lockoutCount: number;
}

// Function to get account details by ID
export async function getAccountById(accountId: string): Promise<Account> {
  try {
    const response = await axiosInstance.get<Account>(`/api/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account details:', error);
    throw error;
  }
}
