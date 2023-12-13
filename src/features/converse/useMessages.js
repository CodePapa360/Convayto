import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { subscribeRealtimeMessage } from "../../services/apiRealtime";

let subscription;

export function useMessages() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient(); // Get the query client
  const myUserId = user.id;

  const { data, isPending, error } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getMessages({ myUserId, friendUserId }),
    // Use previousData to update the messages array
    select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
  });

  const conversationId = data?.conversationId;

  useEffect(
    function () {
      if (!conversationId) return;
      if (conversationId === subscription?.subTopic) return;

      if (subscription) {
        subscription.unsubscribe();
      }

      subscription = subscribeRealtimeMessage({
        conversationId,
        callback: (newData) => {
          // Update the React Query cache with the new message
          queryClient.setQueryData(["friend", friendUserId], (prevData) => {
            return {
              ...prevData,
              messages: [...(prevData.messages || []), newData.new],
            };
          });
        },
      });

      return () => {
        subscription?.unsubscribe();
        console.log("unsubscribed message");
      };
    },
    [conversationId, friendUserId, queryClient]
  );

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
