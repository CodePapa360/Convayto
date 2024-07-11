import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "../userProfile/apiUserAccount";
import toast from "react-hot-toast";

function useResetPasswordForEmail() {
  const {
    mutate: queryResetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, redirectTo }) =>
      sendPasswordResetEmail({ email, redirectTo }),
    onMutate: () => {
      toast.loading("Sending email...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Email sent. Please check your inbox.");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const triggerResetPassword = (email) => {
    const redirectTo =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_REDIRECT_URL_PRODUCTION
        : import.meta.env.VITE_REDIRECT_URL_LOCAL;

    queryResetPassword({ email, redirectTo });
  };

  return {
    resetPassword: triggerResetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  };
}

export default useResetPasswordForEmail;
