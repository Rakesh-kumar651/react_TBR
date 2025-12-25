import axios from "axios";

const API_BASE = "/api/api/devices/device";

export const updateDevice = async ({ deviceId, payload, token }) => {
  const res = await axios.put(
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
