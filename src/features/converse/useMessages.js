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
  const queryClient = useQueryClient();
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
          queryClient.setQueryData(["friend", friendUserId], (prevData) => {
            const existingOptimisticMessage = prevData?.messages?.find(
              (message) => message?.id === newData?.id
            );

            if (!existingOptimisticMessage) {
              // Only update if no optimistic message exists
              return {
                ...prevData,
                messages:
                  prevData.messages === null
                    ? [newData]
                    : [...prevData.messages, newData],
              };
            }

            if (existingOptimisticMessage) {
              // Update existing optimistic message with server data
              return {
                ...prevData,
                messages: prevData.messages.map((message) =>
                  message.id === newData.id ? newData : message
                ),
              };
            }
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
  };
}
