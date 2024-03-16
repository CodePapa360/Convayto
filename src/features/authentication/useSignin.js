import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/apiAuth";

export function useSignin() {
  const queryClient = useQueryClient();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: ({ email, password }) => signinApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });


  return { signin, isPending };
}
