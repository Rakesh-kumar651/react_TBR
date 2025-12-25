import { useQuery } from "@tanstack/react-query";
import { opasGetDevices } from "../../../api/auth/opasdevice/opasGetDevices";


export const useDevicesAll = ({
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
    queryFn: opasGetDevices,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

