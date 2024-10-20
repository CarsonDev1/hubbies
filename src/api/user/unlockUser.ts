import axiosInstance from "../../utils/axiosIntance";

export async function unlockAccount(accountId: string) {
  try {
    const response = await axiosInstance.put(`/api/accounts/${accountId}/unlock`);

    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error unlocking the account:', error);
    throw error;
  }
}
