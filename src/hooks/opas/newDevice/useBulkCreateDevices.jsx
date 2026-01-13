// hooks/opas/useBulkCreateDevices.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { opasBulkCDevices } from "../../../api/auth/opasdevice/opasBulkDevices";

export const useBulkCreateDevices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, token }) =>
      opasBulkCDevices({ payload, token }),

    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
     
    }
  });
};
