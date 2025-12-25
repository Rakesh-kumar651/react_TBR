// api/opasdevice/opasExportDevices.js
import axios from "axios";

const API_BASE = "/api/api/opas/export";

export const opasExportDevices = async ({ payload, token }) => {
  const res = await axios.post(
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
