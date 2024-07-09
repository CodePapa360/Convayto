import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import MainContainer from "./MainContainer";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. if there isno authenticated user, redirect to the signin page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading)
        navigate("/signin", { replace: true });
    },
    [isAuthenticated, isLoading, navigate],
  );

  //3. While loading, show spinner
  if (isLoading)
    return (
      <MainContainer>
        <Loader size="large" text="Loading" />
      </MainContainer>
    );

  //4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
