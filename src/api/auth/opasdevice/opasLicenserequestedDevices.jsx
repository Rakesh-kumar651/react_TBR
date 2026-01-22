import axios from "axios";
import api from "../../auth/axiosInstance";

const API_OpasDevicesAll= "/api/opas";


export const opasLicenserequestedDevices = async ({ queryKey }) => {
  const [_key, { page, limit, sortField, sortOrder, search, token }] = queryKey;

  const response = await api.get(`${API_OpasDevicesAll}/device/devices/licenserequested`, {
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




