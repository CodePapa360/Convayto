import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations } from "./apiConversation";
import { getMessages } from "../messageArea/apiMessage";
import { useUser } from "../authentication/useUser";
import { useEffect, useRef } from "react";
import { subscribeRealtimeConversation } from "./apiRealtimeConversation";
import { MAX_PREFETCHED_CONVERSATIONS } from "../../config";
import { getConvInfoById } from "../messageArea/apiConvInfo";

export function useConversations() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const myUserId = user.id;

  const { data, isPending, error } = useQuery({
    queryKey: ["conversations", myUserId],
    queryFn: () => getConversations({ myUserId }),
  });

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

  if (error) {
    console.error("Error fetching conversations:", error.message);
  }

  /////////////
  // Prefetching
  /////////////
  // set true temporariliiy to avoid prefetching
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (!data || hasPrefetched.current) return;

    data?.slice(0, MAX_PREFETCHED_CONVERSATIONS).forEach((conv) => {
      const conversation_id = conv.id;
      const friendUserId = conv.friendInfo.id;

      // prefetch the messages
      queryClient.prefetchInfiniteQuery({
        queryKey: ["friend", friendUserId],
        queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),
        pages: 1,
      });

      // prefetch the convInfo
      queryClient.prefetchQuery({
        queryKey: ["convInfo", friendUserId],
        queryFn: () => getConvInfoById({ myUserId, friendUserId }),
      });
    });

    hasPrefetched.current = true;
  }, [data, queryClient, myUserId]);
  // prefetch ends

  return { conversations: data, isPending };
}
