import { FaCheckCircle } from "react-icons/fa";
import Heading from "./Heading";
import TextLink from "./TextLink";
import { RiArrowLeftSLine } from "react-icons/ri";

function RecoveryEmailSent() {
  return (
    <div className="flex flex-col items-center">
      <FaCheckCircle className="mb-4 text-4xl text-GreenColor sm:text-5xl" />
      <Heading>We've sent you an email!</Heading>
      <p className="mb-4 text-center opacity-60">
        We've sent a password reset link to your email address. Please check
        your inbox and follow the instructions to reset your password.
      </p>
      <TextLink to="/signin" addClass="flex items-center justify-center">
        <RiArrowLeftSLine />
        Back to Sign in
      </TextLink>
    </div>
  );
}

export default RecoveryEmailSent;
