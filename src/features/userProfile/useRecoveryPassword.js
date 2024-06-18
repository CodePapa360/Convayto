import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "./apiUserAccount";
import { useEffect, useState } from "react";

function useRecoveryPassword() {
  const {
    mutate: sendRecoveryEmail,
    isPending: isSending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,

    onError: (err) => console.log(err.message),
  });

  ///////////////
  // waitTime logic
  ///////////////

  const [canSendAgain, setCanSendAgain] = useState(true);
  const waitTime = 60000; // 1 minute

  useEffect(() => {
    if (isSuccess) {
      setCanSendAgain(false);

      const timeoutId = setTimeout(() => {
        setCanSendAgain(true);
      }, waitTime);

      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess]);

  return { sendRecoveryEmail, isSending, error, isSuccess, canSendAgain };
}

export default useRecoveryPassword;
