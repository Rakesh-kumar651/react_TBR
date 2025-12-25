
import axios from "axios";

const API_BASE = "/api/api/opas";

export const opasCreateinitialize = async ({ payload, token }) => {
  const res = await axios.post(
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