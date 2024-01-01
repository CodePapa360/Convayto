import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: ({ email, password }) => signinApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data);

      navigate("/", {
        replace: true,
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  return { signin, isPending };
}
