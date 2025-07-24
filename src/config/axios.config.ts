// Add global type for window._isLoggingOut to avoid 'any' usage
// This prevents multiple redirects on 401 errors

declare global {
    interface Window {
    _isLoggingOut?: boolean;
    }
}

import axios from "axios";
import { refreshAccessToken } from "../services/authService";

export const axiosInstance = axios.create({
    baseURL: "https://codemap-production.up.railway.app/", 
    withCredentials: true, 
    timeout: 10000, 
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const noAuthEndpoints = ["/auth/login", "/auth/refresh", "/auth/register"];
        if (noAuthEndpoints.some((url) => config.url?.includes(url))) {
        return config; 
        }

    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }

        return config; 
    },
    (error) => Promise.reject(error) 
    );

    axiosInstance.interceptors.response.use(
        (response) => response, 
        async (error) => {
            const originalRequest = error.config; 
            if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 
    
            try {
            const newToken = await refreshAccessToken();
    
            if (newToken) {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.log(err)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("loggedInUser");
                // Prevent multiple redirects using window._isLoggingOut
                if (!window._isLoggingOut) {
                    window._isLoggingOut = true;
                    window.location.href = "/login";
                    return new Promise(() => {}); // Halt further processing
                }
            }
            }
            return Promise.reject(error); 
        }
        );

