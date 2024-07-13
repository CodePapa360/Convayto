import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    mutate: signup,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password, fullname, username }) =>
      apiSignup({ email, password, fullname, username }),
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onSuccess: () => {
      toast.dismiss();
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return { signup, isPending, error, isSuccess };
}
