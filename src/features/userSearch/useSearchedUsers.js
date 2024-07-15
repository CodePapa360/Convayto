import { useState, useEffect } from "react";
import { searchPeople } from "./apiUserSearch";
import { MINIMUM_SEARCH_LENGTH } from "../../config";
import { useUi } from "../../contexts/UiContext";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

export function useSearchedUsers() {
  const { searchQuery } = useUi();
  const cleanSearchQuery = searchQuery.trim();

  const {
    user: { id },
  } = useUser();
  const [users, setUsers] = useState([]);
  const [isShortQuery, setIsShortQuery] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      let timeoutId;

      async function fetchUsers() {
        try {
          setIsLoading(true);
          setError("");
          const data = await searchPeople(cleanSearchQuery);

          setUsers(data);
          setError("");
          setIsShortQuery(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            toast.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (cleanSearchQuery.length < MINIMUM_SEARCH_LENGTH) {
        setIsShortQuery(true);
        setError("");
        setIsLoading(false);
        return;
      } else {
        setIsShortQuery(false);
      }

      setIsLoading(true);

      // Clear the previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout for 1 seconds
      timeoutId = setTimeout(() => {
        fetchUsers();
      }, 1000);

      return function () {
        controller.abort();
        // Clear the timeout on cleanup
        clearTimeout(timeoutId);
      };
    },
    [cleanSearchQuery],
  );

  const filteredUsers = users?.filter((user) => user.id !== id);
  return { users: filteredUsers, isShortQuery, isLoading, error };
}
