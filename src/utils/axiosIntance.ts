import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://hubbies-be.azurewebsites.net/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			console.error('Error status', error.response.status);
			console.error('Error data', error.response.data);
		} else if (error.request) {
			console.error('No response received', error.request);
		} else {
			console.error('Error in setting up request', error.message);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
