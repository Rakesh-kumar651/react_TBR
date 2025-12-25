import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDevice } from "../../api/auth/devicemanagement/updateDevice";

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, payload, token }) =>
      updateDevice({ deviceId, payload, token }),

    onSuccess: () => {
      // refresh device list
      queryClient.invalidateQueries(["devices"]);
    }
  });
};
