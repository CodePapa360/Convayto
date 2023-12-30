import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

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
  if (isLoading) return <p>Loading...</p>;

  //4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
