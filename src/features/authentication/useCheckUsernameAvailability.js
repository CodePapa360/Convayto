import { useState } from "react";
import apiCheckUsername from "./apiCheckUsername";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  USERNAME_REGEX,
} from "../../config";

function useCheckUsernameAvailability() {
  const [isChecking, setIsChecking] = useState(false);
  const [isTaken, setIsTaken] = useState(false);

  const checkUsername = async (username) => {
    const cleanUsername = username.trim();
    if (!cleanUsername) return;
    if (cleanUsername.length < MIN_USERNAME_LENGTH) return;
    if (cleanUsername.length > MAX_USERNAME_LENGTH) return;
    if (!USERNAME_REGEX.test(cleanUsername)) return;

    setIsChecking(true);
    try {
      const data = await apiCheckUsername(cleanUsername);
      const isTaken = data?.username === cleanUsername;

      setIsTaken(isTaken);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  return { isChecking, isTaken, checkUsername };
}

export default useCheckUsernameAvailability;
