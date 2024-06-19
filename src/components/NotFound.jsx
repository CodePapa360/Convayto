import { FaAngleUp, FaExclamationTriangle } from "react-icons/fa";
import MainContainer from "./MainContainer";
import Heading from "./Heading";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <MainContainer>
      <FaExclamationTriangle className="mb-4 text-4xl text-red-500 sm:text-5xl" />

      <Heading>Oops! We can't seem to find that page.</Heading>

      <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
        The page you're looking for might have been removed, or the URL might be
        incorrect.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-md bg-darkViolet px-4 py-2 font-bold text-white"
      >
        Back to Home
        <FaAngleUp />
      </Link>
    </MainContainer>
  );
};

export default NotFound;
