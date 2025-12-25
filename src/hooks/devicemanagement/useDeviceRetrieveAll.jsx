import { useQuery } from "@tanstack/react-query";
import { deviceRetrieveAll } from "../../api/auth/devicemanagement/deviceRetrieveAll";


export const useDeviceRetrieveAll = ({
  page = 1,
  limit = 20,
  sortField = "CreatedAt",
  sortOrder = "desc",
  search = "",
  token
}) => {
  return useQuery({
    queryKey: [
      "devices",
      { page, limit, sortField, sortOrder, search, token }
    ],
    queryFn: deviceRetrieveAll,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

