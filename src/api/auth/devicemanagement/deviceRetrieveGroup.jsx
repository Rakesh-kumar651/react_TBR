import axios from "axios";

const API_DevicesAll= "/api/api/devices";


export const deviceRetrieveGroup = async ({ queryKey }) => {
  const [_key, { page, limit, sortBy, sortOrder, search, token }] = queryKey;

  const response = await axios.get(`${API_DevicesAll}/device/groups`, {
    params: {
      page,
      limit,
      sortBy,
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




