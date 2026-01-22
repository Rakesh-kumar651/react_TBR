import axios from "axios";
import store from "../../store/index";
import { setCredentials, logout } from "../../store/slices/authSlice";
import { refreshTokenApi } from "./loginApi";

const api = axios.create({
  baseURL: "/backend-api",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token)
  );
  failedQueue = [];
};

/* ➕ Attach access token */
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 🔁 Handle 401 + refresh */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const { refreshToken } = store.getState().auth;
        if (!refreshToken) throw new Error("No refresh token");

        const data = await refreshTokenApi(refreshToken);

        store.dispatch(
          setCredentials({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            tokenExpiry: Date.now() + data.expires_in * 1000,
          })
        );

        processQueue(null, data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // 🔴 FORCE LOGOUT + REDIRECT
        store.dispatch(logout());

        // prevent infinite redirect loops
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
