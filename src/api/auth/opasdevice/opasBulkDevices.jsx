// api/opasdevice/opasBulkDevices.js
import axios from "axios";
import api from "../../auth/axiosInstance"; 

const API_BASE = "/api/devices/device";

export const opasBulkCDevices = async ({ payload, token }) => {
  const res = await api.post(
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
