
import axios from "axios";
import api from "../../auth/axiosInstance";

const API_BASE = "/api/opas";

export const opasCreateinitialize = async ({ payload, token }) => {
  const res = await api.post(
    `${API_BASE}/device/initialize`,
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