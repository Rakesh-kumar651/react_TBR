// api/opasdevice/opasExportDevices.js
import axios from "axios";
import api from "../../auth/axiosInstance";

const API_BASE = "/api/opas/export";

export const opasExportDevices = async ({ payload, token }) => {
  const res = await api.post(
    `${API_BASE}/exportDevices`,
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
