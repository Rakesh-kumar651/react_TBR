import axios from "axios";
import api from "../../auth/axiosInstance";

const API_BASE = "/api/devices/device";

export const updateDevice = async ({ deviceId, payload, token }) => {
  const res = await api.put(
    `${API_BASE}/${deviceId}`,
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
