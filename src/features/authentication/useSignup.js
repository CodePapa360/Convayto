import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import toast from "react-hot-toast";
import { getRedirectUrl } from "../../config";

export function useSignup() {
  const {
    mutate: querySignup,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password, fullname, username, redirectTo }) =>
      apiSignup({ email, password, fullname, username, redirectTo }),
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

  // This is just for developement purpose. We need to dynamically itentify the environment wheather it is production or local so that we don't need to change the link manually every time
  const triggerResetPassword = ({ email, password, fullname, username }) => {
    const redirectTo = `${getRedirectUrl()}/account-confirmation`;

    querySignup({ email, password, fullname, username, redirectTo });
  };

  return { signup: triggerResetPassword, isPending, error, isSuccess };
}
