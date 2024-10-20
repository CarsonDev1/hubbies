import axiosInstance from "../../utils/axiosIntance";

interface UpdateAccountInfo {
  firstName: string;
  lastName: string;
  address: string;
  dob: string;
  phoneNumber: string;
  avatar: string;
}

export async function updateAccount(accountData: UpdateAccountInfo) {
  try {
    const response = await axiosInstance.put('/api/accounts', accountData);

    if (response.status === 204 || response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating the account:', error);
    throw error;
  }
}
