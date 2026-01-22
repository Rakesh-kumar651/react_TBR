import axios from "axios";
import api from "../../auth/axiosInstance";

const API_OpasDevicesAll= "/api/opas";

export const opasCreateCluster = async ({ clusterName, token }) => {
  const response = await api.post(
    `${API_OpasDevicesAll}/cluster`,
    { clusterName },
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  );

  return response.data;
};