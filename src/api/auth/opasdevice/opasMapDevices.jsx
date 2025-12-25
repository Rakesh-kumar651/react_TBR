import axios from "axios";

const API_OpasDevicesAll = "/api/api/opas";

export const opasMapDevices = async ({ payload, token }) => {
  const response = await axios.post(
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
