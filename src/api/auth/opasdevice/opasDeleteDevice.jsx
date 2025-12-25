import axios from "axios";

const API_BASE = "/api/api/opas";

export const opasDeleteDevice = async ({ id, token }) => {
  const res = await axios.delete(`${API_BASE}/device/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

