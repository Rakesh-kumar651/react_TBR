import { useMutation } from "@tanstack/react-query";
import { importDevices } from "../../../api/auth/opasdevice/importDevices";

export const useImportDevices = () => {
  return useMutation({
    mutationFn: ({ file, token }) =>
      importDevices({ file, token })
  });
};
