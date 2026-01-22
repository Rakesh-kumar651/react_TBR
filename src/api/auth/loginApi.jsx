import axios from "axios";

import api from "../auth/axiosInstance";

const TOKEN_URL =
  "/auth/realms/EdgeBlox/protocol/openid-connect/token";

const CLIENT_ID = "apigateway";
const CLIENT_SECRET = "1hTCAbBF6wZrIrpwy8xXR4uVe36odFGd";

/* 🔐 LOGIN (password grant) */
export const loginApi = async ({ email, password }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("client_id", CLIENT_ID);
  formData.append("client_secret", CLIENT_SECRET);
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post(TOKEN_URL, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return res.data;
};

/* 🔄 REFRESH TOKEN */
export const refreshTokenApi = async (refreshToken) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");
  formData.append("client_id", CLIENT_ID);
  formData.append("client_secret", CLIENT_SECRET);
  formData.append("refresh_token", refreshToken);

  const res = await api.post(TOKEN_URL, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return res.data;
};
