import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. if there isno authenticated user, redirect to the signin page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/signin");
    },
    [isAuthenticated, isLoading, navigate],
  );

  //3. While loading, show spinner
  if (isLoading)
    return (
      <p className="flex min-h-dvh min-h-screen min-h-svh items-center justify-center bg-mediumSlate text-mediumSlate-dark dark:bg-mediumSlate-dark dark:text-mediumSlate">
        <Loader size="large" text="Loading app" />
      </p>
    );

  //4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
