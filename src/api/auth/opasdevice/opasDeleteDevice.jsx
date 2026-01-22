import axios from "axios";
import api from "../../auth/axiosInstance";

const API_BASE = "/api/opas";

export const opasDeleteDevice = async ({ id, token }) => {
  const res = await api.delete(`${API_BASE}/device/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

