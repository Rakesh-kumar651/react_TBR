// hooks/opas/useExportDevices.js
import { useMutation } from "@tanstack/react-query";
import { exportDevices } from "../../api/auth/devicemanagement/exportDevices";

export const useDeviceExportDevices = () => {
  return useMutation({
    mutationFn: ({ payload, token }) =>
      exportDevices({ payload, token })
  });
};
