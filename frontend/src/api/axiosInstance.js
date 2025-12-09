import axios from "axios";

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



// Axios Silent Refresh interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // get new access token
        const refreshRes = await api.post("/auth/refresh");

        // Save new token somewhere (context)
        const newAccessToken = refreshRes.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update request header and retry it
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshErr) {
        console.log("Refresh failed → Logging out");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
