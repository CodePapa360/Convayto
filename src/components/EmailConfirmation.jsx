import { FaCheckCircle } from "react-icons/fa";
import Heading from "./Heading";
import TextLink from "./TextLink";

function EmailConfirmation() {
  return (
    <div className="flex flex-col items-center">
      <FaCheckCircle className="mb-4 text-4xl text-GreenColor sm:text-5xl" />
      <Heading>Thanks for signing up!</Heading>
      <p className="mb-4 text-center opacity-60">
        We've sent a confirmation email to your inbox. Please click the link in
        the email to verify your account and complete your signup.
      </p>

      <p>
        Already confirmed?{" "}
        <TextLink to="/signin" className="text-center underline">
          Sign in here
        </TextLink>
      </p>
    </div>
  );
}

export default EmailConfirmation;
