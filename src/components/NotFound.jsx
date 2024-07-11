import { FaAngleUp, FaExclamationTriangle } from "react-icons/fa";
import MainContainer from "./MainContainer";
import Heading from "./Heading";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <MainContainer>
      <div className="flex max-w-lg flex-col items-center">
        <FaExclamationTriangle className="mb-4 text-4xl text-RedColor sm:text-5xl" />

        <Heading>Oops! We can't seem to find that page.</Heading>

        <p className="mb-4 text-center opacity-60">
          The page you're looking for might have been removed, or the URL might
          be incorrect.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-md bg-bgAccent px-4 py-2 font-bold text-textPrimary-dark dark:bg-bgAccent-dark"
        >
          Back to Home
          <FaAngleUp />
        </Link>
      </div>
    </MainContainer>
  );
};

export default NotFound;
