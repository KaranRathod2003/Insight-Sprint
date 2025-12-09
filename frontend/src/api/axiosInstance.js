import axios from "axios";

import { useAuth } from "../context/AuthContext";


export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


let setRefreshingFn = null;
let updateTokenFn = null;

export const registerAuthHandlers = (handlers) => {
  setRefreshingFn = handlers.setRefreshing;
  updateTokenFn = handlers.updateToken;
};


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { updateToken, setRefreshing } = useAuth(); // ❗ Not allowed directly inside interceptor
});



// Axios Silent Refresh interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // get new access token
//         const refreshRes = await api.post("/auth/refresh");

//         // Save new token somewhere (context)
//         const newAccessToken = refreshRes.data.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);

//         // Update request header and retry it
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);

//       } catch (refreshErr) {
//         console.log("Refresh failed → Logging out");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (setRefreshingFn) setRefreshingFn(true);   // ⭐ Show overlay

        const response = await api.post("/auth/refresh");

        const newAccessToken = response.data.data.accessToken;

        if (updateTokenFn) updateTokenFn(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshErr) {
        window.location.href = "/login";
      } finally {
        if (setRefreshingFn) setRefreshingFn(false); // ⭐ Hide overlay
      }
    }

    return Promise.reject(error);
  }
);
