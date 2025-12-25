import { useMutation, useQueryClient } from "@tanstack/react-query";
import { opasMapDevices } from "../../../api/auth/opasdevice/opasMapDevices";

export const useMapDevices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, token }) =>
      opasMapDevices({ payload, token }),

    onSuccess: () => {
      // refresh related data if needed
      queryClient.invalidateQueries(["devices"]);
      queryClient.invalidateQueries(["clusters"]);
      queryClient.invalidateQueries(["groups"]);
    }
  });
};
