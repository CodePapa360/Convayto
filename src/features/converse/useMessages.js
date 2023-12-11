// useMessages.js

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";

export function useMessages() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient(); // Get the query client

  const { data, isPending, error } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getMessages({ myUserId: user.id, friendUserId }),
    // Use previousData to update the messages array
    select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
  });

  if (error) {
    console.error(
      "Error fetching conversations (from custom hook):",
      error.message
    );
  }

  // Return the query data and a function to set data
  return {
    data,
    isPending,
    setData: (newData) =>
      queryClient.setQueryData(["friend", friendUserId], newData),
  };
}
