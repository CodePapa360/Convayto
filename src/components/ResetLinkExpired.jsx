import { FaAngleUp, FaExclamationTriangle } from "react-icons/fa";
import Heading from "./Heading";
import { Link } from "react-router-dom";

function ResetLinkExpired() {
  return (
    <div className="flex flex-col items-center gap-2">
      <FaExclamationTriangle className="mb-4 text-4xl text-red-500 sm:text-5xl" />

      <Heading>Oops! The password reset link is invalid or expired.</Heading>

      <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
        The link you clicked to reset your password might be incorrect, expired,
        or used already. Please request a new password reset.
      </p>

      <Link
        to="/reset-password"
        className="inline-flex items-center gap-1 rounded-md bg-darkViolet px-4 py-2 font-bold text-white"
      >
        Request new password reset
        <FaAngleUp />
      </Link>
    </div>
  );
}

export default ResetLinkExpired;
