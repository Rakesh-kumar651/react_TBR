import { useQuery } from "@tanstack/react-query";
import { opasGetClusters } from "../../../api/auth/opasdevice/opasGetClusters";


export const useClusterAll = ({
  page = 1,
  limit = 20,
  sortField = "CreatedAt",
  sortOrder = "desc",
  search = "",
  token
}) => {
  return useQuery({
    queryKey: [
      "clusters",
      { page, limit, sortField, sortOrder, search, token }
    ],
    queryFn: opasGetClusters,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

