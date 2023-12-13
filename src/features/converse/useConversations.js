import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useEffect } from "react";
import { subscribeRealtimeConversation } from "../../services/apiRealtime";
import { sortByTime } from "../../utils/common";

let subscriptionConversation;

export function useConversatoins() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const myUserId = user.id;

  const { data, isPending, error } = useQuery({
    queryKey: ["conversations", myUserId],
    queryFn: () => getConversations({ myUserId }),
  });

  const conversationIds = data?.conversationIds;

  useEffect(
    function () {
      if (!myUserId) return;
      if (myUserId === subscriptionConversation?.subTopic) return;

      if (subscriptionConversation) {
        subscriptionConversation.unsubscribe();
      }

      const updateConversation = (payload) => {
        // Update the React Query cache with the new message
        queryClient.setQueryData(["conversations", myUserId], (prevData) => {
          const conversationArray = prevData.combinedArray;

          const updatedArray = conversationArray.map((conversation) => {
            if (conversation.lastMessage.conversation_id === payload.id) {
              return { ...conversation, lastMessage: payload };
            } else {
              return conversation;
            }
          });

          return {
            ...prevData,
            combinedArray: updatedArray.sort(sortByTime),
          };
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
