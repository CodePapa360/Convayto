import { FaExclamationTriangle } from "react-icons/fa";
import Heading from "./Heading";
import MainContainer from "./MainContainer";
import { useUser } from "../features/authentication/useUser";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function AccountConfirmation() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  const hash = window.location.hash;
  const params = new URLSearchParams(hash.slice(1));
  const errorDescription = params.get("error_description");

  if (isLoading)
    return (
      <MainContainer>
        <Loader size="large" text="Loading" />
      </MainContainer>
    );

  // if authenticated, navigate to the home page
  if (isAuthenticated) navigate("/", { replace: true });

  // if not authenticated, show the error message
  if (!isAuthenticated)
    return (
      <MainContainer>
        <div className="flex max-w-lg flex-col items-center">
          <FaExclamationTriangle className="mb-4 text-4xl text-RedColor sm:text-5xl" />

          <Heading>{errorDescription}</Heading>

          <p className="mb-4 text-center opacity-60">
            The link you clicked to confirm your account might be incorrect,
            expired, or used already. Please request a new confirmation link.
          </p>
        </div>
      </MainContainer>
    );
}

export default AccountConfirmation;
