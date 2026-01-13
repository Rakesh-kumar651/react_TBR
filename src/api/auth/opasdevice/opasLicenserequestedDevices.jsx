import axios from "axios";

const API_OpasDevicesAll= "/api/api/opas";


export const opasLicenserequestedDevices = async ({ queryKey }) => {
  const [_key, { page, limit, sortField, sortOrder, search, token }] = queryKey;

  const response = await axios.get(`${API_OpasDevicesAll}/device/devices/licenserequested`, {
    params: {
      page,
      limit,
      sortField,
      sortOrder,
      search
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
      
    
    }
  });

  return response.data;
};




