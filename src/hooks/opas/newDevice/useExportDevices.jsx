// hooks/opas/useExportDevices.js
import { useMutation } from "@tanstack/react-query";
import { opasExportDevices } from "../../../api/auth/opasdevice/opasExportDevices";

export const useExportDevices = () => {
  return useMutation({
    mutationFn: ({ payload, token }) =>
      opasExportDevices({ payload, token })
  });
};
