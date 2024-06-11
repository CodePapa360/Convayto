import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations } from "./apiConversation";
import { getMessages } from "../messageArea/apiMessage";
import { useUser } from "../authentication/useUser";
import { useEffect, useRef } from "react";
import { subscribeRealtimeConversation } from "./apiRealtimeConversation";
import { sortConverseByTime } from "../../utils/common";
import { MAX_PREFETCHED_CONVERSATIONS } from "../../config";

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

      const updateConversation = (payload) => {
        queryClient.setQueryData(["conversations", myUserId], (prevData) => {
          if (payload?.eventType === "INSERT") {
            return [...prevData, payload.new];
          } else if (payload?.eventType === "UPDATE") {
            const newData = prevData.map((conversation) => {
              if (conversation.id === payload?.new.id) {
                return { ...conversation, ...payload.new };
              }
              return conversation;
            });
            return newData;
          }
        });
      };

      subscriptionConversationRef.current = subscribeRealtimeConversation({
        myUserId,
        onUpdate: updateConversation,
      });

      return () => {
        if (subscriptionConversationRef.current) {
          subscriptionConversationRef.current.unsubscribe();

          // console.log("unsubscribed conversation");
        }
      };
    },

    [myUserId, queryClient],
  );

  if (error) {
    console.error("Error fetching conversations:", error.message);
  }

  const sortedConversations =
    data?.length > 1 ? data?.sort(sortConverseByTime) : data;

  /////////////
  // Prefetching
  /////////////
  // set true temporariliiy to avoid prefetching
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (!sortedConversations || hasPrefetched.current) return;

    sortedConversations
      ?.slice(0, MAX_PREFETCHED_CONVERSATIONS)
      .forEach((conv) => {
        const conversation_id = conv.id;
        const friendUserId = conv.friendInfo.id;

        queryClient.prefetchInfiniteQuery({
          queryKey: ["friend", friendUserId],
          queryFn: ({ pageParam }) =>
            getMessages({ conversation_id, pageParam }),
          pages: 1,
        });
      });

    hasPrefetched.current = true;
  }, [sortedConversations, queryClient]);
  // prefetch ends

  return { conversations: sortedConversations, isPending };
}
