import axios from "axios";
import api from "../../auth/axiosInstance";

const API_BASE = "/api/opas/device";

export const updateDeviceLicense = async ({ payload, token }) => {
  const res = await api.put(
    `${API_BASE}/updateLicense`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  );

  return res.data;
};
