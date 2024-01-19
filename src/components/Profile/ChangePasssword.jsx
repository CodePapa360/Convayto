import { useUser } from "../../features/authentication/useUser";
import { sendPasswordResetEmail } from "../../services/apiAuth";

function ChangePasssword() {
  const { user } = useUser();
  const { email } = user;

  function handleRequest() {
    try {
      sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={handleRequest}
      className="mt-4 h-10 rounded-md bg-textViolet px-4 text-lightSlate hover:bg-textViolet/50"
    >
      Send password reset email
    </button>
  );
}

export default ChangePasssword;
