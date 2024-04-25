import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password, fullname, username }) =>
      apiSignup({ email, password, fullname, username }),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data);

      navigate("/", {
        replace: true,
      });
    },

    onError: (err) => {
      // console.log("ERROR", err);
    },
  });

  return { signup, isPending, error };
}
