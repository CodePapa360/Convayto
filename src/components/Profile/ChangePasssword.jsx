import { useUser } from "../../features/authentication/useUser";
import { sendPasswordResetEmail } from "../../services/apiAuth";

function ChangePasssword() {
  const { user } = useUser();
  const { email } = user;

  function handleRequest() {
    try {
      // request to change password
      sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        onClick={handleRequest}
        className="h-10 rounded-md bg-textViolet px-4 text-lightSlate hover:bg-textViolet/50"
      >
        Send password reset email
      </button>
    </div>
  );
}

export default ChangePasssword;
