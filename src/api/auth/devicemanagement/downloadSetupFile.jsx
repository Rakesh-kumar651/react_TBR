import axios from "axios";

const API_BASE = "/api/api/devices/device"; // adjust if needed

export const downloadSetupFile = async ({ id, payload, token }) => {
  const res = await axios.post(
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
