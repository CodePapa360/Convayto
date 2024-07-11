import { FaAngleUp, FaExclamationTriangle } from "react-icons/fa";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import MainContainer from "./MainContainer";

function ResetLinkExpired() {
  return (
    <MainContainer>
      <div className="flex max-w-lg flex-col items-center">
        <FaExclamationTriangle className="mb-4 text-4xl text-RedColor sm:text-5xl" />

        <Heading>Oops! The password reset link is invalid or expired!</Heading>

        <p className="mb-4 text-center opacity-60">
          The link you clicked to reset your password might be incorrect,
          expired, or used already. Please request a new password reset.
        </p>

        <Link
          to="/reset-password"
          className="inline-flex items-center gap-1 rounded-md bg-bgAccent px-4 py-2 font-bold text-textPrimary-dark dark:bg-bgAccent-dark"
        >
          Send a new request
          <FaAngleUp />
        </Link>
      </div>
    </MainContainer>
  );
}

export default ResetLinkExpired;
