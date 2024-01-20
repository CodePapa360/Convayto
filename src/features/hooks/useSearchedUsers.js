import { useState, useEffect } from "react";
import { searchPeople } from "../../services/apiAuth";
import { MINIMUM_SEARCH_LENGTH } from "../../config";

export function useSearchedUsers(query) {
  const [users, setUsers] = useState([]);
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
          const data = await searchPeople(query);

          setUsers(data);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < MINIMUM_SEARCH_LENGTH) {
        setUsers([]);
        setError("");
        setIsLoading(false); // Reset loading state
        return;
      }

      setIsLoading(true); // Set loading state to true

      // Clear the previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout for 2 seconds
      timeoutId = setTimeout(() => {
        fetchUsers();
      }, 1000);

      return function () {
        controller.abort();
        // Clear the timeout on cleanup
        clearTimeout(timeoutId);
      };
    },
    [query],
  );

  return { users, isLoading, error };
}
