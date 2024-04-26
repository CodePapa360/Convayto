import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "../userProfile/apiUserAccount";

function useResetPasswordForEmail() {
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return { resetPassword, isPending, isSuccess, isError, error };
}

export default useResetPasswordForEmail;
