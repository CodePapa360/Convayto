import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { subscribeRealtimeConversation } from "./apiRealtimeConversation";

const useConversationSubscription = (myUserId) => {
  const queryClient = useQueryClient();
  const subscriptionConversationRef = useRef(null);

  useEffect(
    function () {
      if (!myUserId || subscriptionConversationRef.current) return;

      const callback = (payload) => {
        queryClient.setQueryData(["conversations", myUserId], (prevData) => {
          if (payload?.eventType === "INSERT") {
            // Insert the new entry at the beginning of the array
            return [payload.new, ...prevData];
          } else if (payload?.eventType === "UPDATE") {
            // Find the updated conversation and update it
            const updatedConversation = prevData.find(
              (conversation) => conversation.id === payload.new.id,
            );
            const otherConversations = prevData.filter(
              (conversation) => conversation.id !== payload.new.id,
            );

            // Return the updated conversation at the beginning of the array
            return [
              { ...updatedConversation, ...payload.new },
              ...otherConversations,
            ];
          }
        });
      };

      subscriptionConversationRef.current = subscribeRealtimeConversation({
        myUserId,
        callback,
      });

      return () => {
        if (subscriptionConversationRef.current) {
          subscriptionConversationRef.current.unsubscribe();
          subscriptionConversationRef.current = null;

          // console.log("unsubscribed conversation");
        }
      };
    },

    [myUserId, queryClient],
  );
};

export default useConversationSubscription;
