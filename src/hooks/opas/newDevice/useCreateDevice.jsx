// hooks/useCreateDevice.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { opasCreateGroup } from "../../../api/auth/opasdevice/opasCreateGroup";
import { opasCreateCluster } from "../../../api/auth/opasdevice/opasCreateCluster";

export const useCreateDevice = (keyName) => {
  const queryClient = useQueryClient();

  const isCluster = keyName === "clusterName";

  return useMutation({
    mutationFn: (payload) =>
      isCluster
        ? opasCreateCluster(payload)
        : opasCreateGroup(payload),

    onSuccess: () => {
      // 🔄 invalidate correct list
      queryClient.invalidateQueries(
        isCluster ? ["clusters"] : ["groups"]
      );
    }
  });
};
