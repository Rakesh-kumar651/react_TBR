import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeviceLicense } from "../../../api/auth/opasdevice/updateLicense";

export const useUpdateDeviceLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, token }) =>
      updateDeviceLicense({ payload, token }),

    onSuccess: () => {
      // refresh device data
      queryClient.invalidateQueries(["devices"]);
    }
  });
};
