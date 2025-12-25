import { useQuery } from "@tanstack/react-query";
import { opasGetGroups } from "../../../api/auth/opasdevice/opasGetGroups";


export const useGroupAll = ({
  page = 1,
  limit = 20,
  sortField = "CreatedAt",
  sortOrder = "desc",
  search = "",
  token
}) => {
  return useQuery({
    queryKey: [
      "Groups",
      { page, limit, sortField, sortOrder, search, token }
    ],
    queryFn: opasGetGroups,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

