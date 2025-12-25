import axios from "axios";

const API_OpasDevicesAll= "/api/api/opas";

export const opasCreateCluster = async ({ clusterName, token }) => {
  const response = await axios.post(
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