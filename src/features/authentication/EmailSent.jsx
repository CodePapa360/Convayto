import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading";
import TextLink from "../../components/TextLink";
import { RiArrowLeftSLine } from "react-icons/ri";

function EmailSent() {
  return (
    <div className="flex flex-col items-center">
      <FaCheckCircle className="mb-4 text-4xl text-green-500 sm:text-5xl" />
      <Heading>We've sent you an email!</Heading>
      <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
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

export default EmailSent;
