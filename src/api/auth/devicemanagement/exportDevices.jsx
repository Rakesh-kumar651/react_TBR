// api/opasdevice/opasExportDevices.js
import axios from "axios";

const API_BASE = "/api/api/devices/device";

export const exportDevices = async ({ payload, token }) => {
  const res = await axios.post(
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
