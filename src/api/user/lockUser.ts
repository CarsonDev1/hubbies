import axiosInstance from "../../utils/axiosIntance";

export async function lockAccount(accountId: string) {
  try {
    const response = await axiosInstance.put(`/accounts/${accountId}/lock`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error locking the account:', error);
    throw error;
  }
}
