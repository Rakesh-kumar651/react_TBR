import { useMutation } from "@tanstack/react-query";
import { downloadSetupFile } from "../../api/auth/devicemanagement/downloadSetupFile";

export const useDownloadSetupFile = () => {
  return useMutation({
    mutationFn: downloadSetupFile,
  });
};
