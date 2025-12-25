import axios from "axios";

const API_BASE = "/api/api/opas/device";

export const updateDeviceLicense = async ({ payload, token }) => {
  const res = await axios.put(
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
