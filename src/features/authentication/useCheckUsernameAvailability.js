import { useEffect, useState } from "react";
import apiCheckUsername from "./apiCheckUsername";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  USERNAME_REGEX,
} from "../../config";

function useCheckUsernameAvailability() {
  const [oldUsername, setOldUsername] = useState("");
  const [username, setUsername] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isTaken, setIsTaken] = useState(false);

  useEffect(() => {
    if (
      !username ||
      username.length < MIN_USERNAME_LENGTH ||
      username.length > MAX_USERNAME_LENGTH ||
      !USERNAME_REGEX.test(username)
    ) {
      setIsBusy(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsChecking(true);
      apiCheckUsername(username)
        .then((data) => {
          const serverUsername = data?.username === username;

          if (!serverUsername) {
            setIsTaken(false);
            return;
          } else if (oldUsername === username) {
            setIsTaken(false);
            return;
          } else {
            setIsTaken(true);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsChecking(false);
          setIsBusy(false);
        });
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(timeoutId);
  }, [username, oldUsername]);

  const checkUsername = (newUsername, oldUsername) => {
    setIsBusy(true);
    setUsername(newUsername.trim());
    oldUsername && setOldUsername(oldUsername.trim());
  };

  function reset() {
    setUsername("");
    setOldUsername("");
    setIsBusy(false);
    setIsChecking(false);
    setIsTaken(false);
  }

  return { isBusy, isChecking, isTaken, checkUsername, reset };
}

export default useCheckUsernameAvailability;
