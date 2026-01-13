import { useQuery } from "@tanstack/react-query";
import { deviceRetrieveGroup } from "../../api/auth/devicemanagement/deviceRetrieveGroup";


export const useDeviceRetrieveGroup = ({
  page,
  limit = 20,
  sortBy = "GroupName",
  sortOrder = "desc",
  search = "",
  token
}) => {
  return useQuery({
    queryKey: [
      "devicesgroup",
      { page, limit, sortBy, sortOrder, search, token }
    ],
    queryFn: deviceRetrieveGroup,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

