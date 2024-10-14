/* eslint-disable @typescript-eslint/no-explicit-any */
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

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: unknown, token = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});

	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers['Authorization'] = `Bearer ${token}`;
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			isRefreshing = true;

			try {
				const expiredToken = localStorage.getItem('token');
				const refreshToken = localStorage.getItem('refreshToken');
				const refreshResponse = await axios.post('https://hubbies-be.azurewebsites.net/api/auths/refresh-token', {
					expiredToken,
					refreshToken,
				});

				const { newAccessToken, newRefreshToken } = refreshResponse.data;
				localStorage.setItem('token', newAccessToken);
				localStorage.setItem('refreshToken', newRefreshToken);

				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
				processQueue(null, newAccessToken);

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

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
