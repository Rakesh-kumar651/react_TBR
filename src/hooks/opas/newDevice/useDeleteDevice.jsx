// src/hooks/opas/newDevice/useDeleteDevice.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { opasDeleteDevice } from "../../../api/auth/opasdevice/opasDeleteDevice";

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: opasDeleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};
