import axios from "axios";

const API_OpasDevicesAll= "/api/api/opas";

export const opasCreateGroup = async ({ groupName, token }) => {
  const response = await axios.post(
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