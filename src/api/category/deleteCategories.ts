import axiosInstance from '../../utils/axiosIntance';

export const deleteCategory = async (id: string) => {
	const response = await axiosInstance.delete(`/event-categories/${id}`);
	return response.data;
};
