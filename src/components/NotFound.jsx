import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lightSlate p-4 text-black dark:bg-deepSlate-dark dark:text-white">
      <FaExclamationTriangle className="mb-4 text-4xl text-red-500 sm:text-5xl" />
      <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200 sm:text-3xl lg:text-4xl">
        Oops! We can't seem to find that page.
      </h1>
      <p className="my-4 text-center  text-gray-500 dark:text-gray-400">
        The page you're looking for might have been removed, or the URL might be
        incorrect.
      </p>
      <a
        href="/"
        className="inline-flex items-center rounded-md  bg-darkViolet px-4 py-2 font-bold text-white"
      >
        Go Back Home
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-mr-1 ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7l7 7"
          />
        </svg>
      </a>
    </div>
  );
};

export default NotFound;
