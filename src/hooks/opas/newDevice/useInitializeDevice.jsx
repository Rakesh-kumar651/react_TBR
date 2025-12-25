
import { opasCreateinitialize } from "../../../api/auth/opasdevice/opasCreateinitialize";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInitializeDevice = () => {
 
 const queryClient = useQueryClient();


  return useMutation({

 mutationFn: ({ payload, token }) =>
      opasCreateinitialize({ payload, token }),

    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    }
    
    });

};
