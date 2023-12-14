import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useEffect } from "react";
import { subscribeRealtimeConversation } from "../../services/apiRealtime";

let subscriptionConversation;

export function useConversatoins() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const myUserId = user.id;

  const { data, isPending, error } = useQuery({
    queryKey: ["conversations", myUserId],
    queryFn: () => getConversations({ myUserId }),
  });

  // Extract all conversation IDs
  const conversationIds = data?.map((conv) => conv.id);

  useEffect(
    function () {
      if (!myUserId || !conversationIds) return;

      if (subscriptionConversation) {
        subscriptionConversation.unsubscribe();
      }

      const updateConversation = (payload) => {
        queryClient.setQueryData(["conversations", myUserId], (prevData) => {
          const updatedArray = prevData.map((conversation) => {
            if (conversation.id === payload.id) {
              return { ...conversation, ...payload };
            } else {
              return conversation;
            }
          });

          return updatedArray;
        });
      };

      subscriptionConversation = subscribeRealtimeConversation({
        myUserId,
        conversationIds,
        onUpdate: updateConversation,
      });

      return () => {
        subscriptionConversation?.unsubscribe();
        console.log("unsubscribed conversations");
      };
    },
    [myUserId, queryClient, conversationIds]
  );

  if (error) {
    console.error("Error fetching conversations:", error.message);
  }

  return { data, isPending };
}
