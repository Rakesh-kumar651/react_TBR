import axios from "axios";
import api from "../../auth/axiosInstance";
const API_BASE = "/api/devices/device"; // adjust if needed

export const downloadSetupFile = async ({ id, payload, token }) => {
  const res = await api.post(
    `${API_BASE}/downloadSetupFile/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    //   responseType: "blob", // ✅ important
    }
  );

  return res.data;
};
