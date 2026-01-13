import { useQuery } from "@tanstack/react-query";
import { opasLicenserequestedDevices } from "../../../api/auth/opasdevice/opasLicenserequestedDevices";


export const useLicenserequestedDevices = ({
  page ,
  limit,
  sortField ,
  sortOrder ,
  search ,
  token
}) => {
  return useQuery({
    queryKey: [
      "licensedevices",
      { page, limit, sortField, sortOrder, search, token }
    ],
    queryFn: opasLicenserequestedDevices,
    enabled: !!token,   // 🔐 only run if token exists
    keepPreviousData: true,
  });
};

