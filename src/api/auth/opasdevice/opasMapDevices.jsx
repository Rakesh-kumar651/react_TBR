import axios from "axios";
import api from "../../auth/axiosInstance";

const API_OpasDevicesAll = "/api/opas";

export const opasMapDevices = async ({ payload, token }) => {
  const response = await api.post(
    `${API_OpasDevicesAll}/mapping/map-devices`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  );

  return response.data;
};
