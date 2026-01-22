import axios from "axios";
import api from "../../auth/axiosInstance";

const API_OpasDevicesAll= "/api/opas";

export const opasCreateGroup = async ({ groupName, token }) => {
  const response = await api.post(
    `${API_OpasDevicesAll}/group`,
    { groupName },
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  );

  return response.data;
};