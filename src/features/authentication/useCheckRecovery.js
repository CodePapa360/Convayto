import { useEffect, useState } from "react";
import { useUser } from "./useUser";

function useCheckRecovery() {
  const [isLoading, setIsLoading] = useState(true);
  const [urlRefreshToken, setUrlRefreshToken] = useState("");
  const { session } = useUser();
  const refreshToken = session?.refresh_token;

  // Extract the refresh token from the window URL
  const urlHash = window.location?.hash?.split("&");
  const token = urlHash[3]?.split("=")[1];

  useEffect(() => {
    if (token !== undefined && token !== "") {
      setUrlRefreshToken(token);
    }

    // Simulated loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [token, refreshToken, urlRefreshToken]);

  const isRecovery = refreshToken === urlRefreshToken;

  return { isRecovery, isLoading };
}

export default useCheckRecovery;
