// api/opasdevice/opasBulkDevices.js
import axios from "axios";

const API_BASE = "/api/api/devices/device";

export const opasBulkCDevices = async ({ payload, token }) => {
  const res = await axios.post(
    `${API_BASE}/bulk`,
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
