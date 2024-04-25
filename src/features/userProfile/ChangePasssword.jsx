import { useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { sendPasswordResetEmail } from "./apiUserAccount";
import Loader from "../../components/Loader";

function ChangePasssword() {
  const { user } = useUser();
  const { email } = user;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleRequest() {
    setIsLoading(true);

    try {
      const data = await sendPasswordResetEmail(email);
      if (data) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
    }
  }

  return (
    <button
      disabled={isLoading || isSuccess}
      onClick={handleRequest}
      className="mt-6 flex h-10 items-center gap-2 rounded-md bg-textViolet px-4 text-lightSlate hover:bg-textViolet/50 disabled:bg-gray-500/30 disabled:opacity-70"
    >
      {!isSuccess ? (
        <>
          <span>Reset password</span>
          {isLoading && <Loader />}
        </>
      ) : (
        <span>Sent email</span>
      )}
    </button>
  );
}

export default ChangePasssword;
