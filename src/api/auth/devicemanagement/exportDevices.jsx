// api/opasdevice/opasExportDevices.js
import axios from "axios";
import api from "../../auth/axiosInstance";
const API_BASE = "/api/devices/device";

export const exportDevices = async ({ payload, token }) => {
  const res = await api.post(
    `${API_BASE}/export`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      responseType: "blob" // 🔥 important for file download
    }
  );

  return res.data;
};
