import axios from "axios";
import api from "../../auth/axiosInstance";
const API_DevicesAll= "/api/devices";


export const deviceRetrieveAll = async ({ queryKey }) => {
  const [_key, { page, limit, sortField, sortOrder, search, token }] = queryKey;

  const response = await api.get(`${API_DevicesAll}/device`, {
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




