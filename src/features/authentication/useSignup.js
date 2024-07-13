import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import toast from "react-hot-toast";

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
    // sample in the env file
    // VITE_REDIRECT_URL_LOCAL = http://localhost:3000
    // VITE_REDIRECT_URL_PRODUCTION = https://chat-su.vercel.app
    // The route is /account-confirmation. so we need to append it to the url

    const redirectTo =
      import.meta.env.MODE === "production"
        ? `${import.meta.env.VITE_REDIRECT_URL_PRODUCTION}/account-confirmation`
        : `${import.meta.env.VITE_REDIRECT_URL_LOCAL}/account-confirmation`;

    querySignup({ email, password, fullname, username, redirectTo });
  };

  return { signup: triggerResetPassword, isPending, error, isSuccess };
}
