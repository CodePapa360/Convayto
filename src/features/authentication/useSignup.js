import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data);

      navigate("/", {
        replace: true,
      });
      toast.dismiss();
      toast.success("Signed up successfully!");
    },

    onError: (error) => {
      console.log("error from hook", error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return { signup, isPending, error };
}
