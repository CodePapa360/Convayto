import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useEffect, useRef } from "react";
import { subscribeRealtimeMessage } from "../../services/apiRealtime";

export function useMessages() {
  const { currentConversation } = useAppData();
  const conversation_id = currentConversation?.id;
  const { userId: friendUserId } = useParams();
  const queryClient = useQueryClient();

  // Clear the cache when the conversation changes
  useEffect(() => {
    queryClient.setQueryData(
      ["friend", friendUserId, conversation_id],
      (prev) => {
        if (!prev || !prev.pages[1]?.length) return;

        return {
          pages: prev.pages.slice(0, 1),
          pageParams: prev.pageParams.slice(0, 1),
        };
      },
    );
  }, [friendUserId, queryClient, conversation_id]);

  const {
    data: { pages } = {},
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["friend", friendUserId, conversation_id],
    queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),

    // Causes re render infinit times
    select: (data) => {
      if (!data || data?.pages[0] === undefined) return;
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      };
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage?.length === 0) return undefined;
      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  if (error) {
    console.error(
      "Error fetching conversations (from custom hook)",
      error.message,
    );
  }

  /////////////////////////////
  // Realtime subscription //
  /////////////////////////////

  const subscriptionRef = useRef(null);

  useEffect(
    function () {
      if (!conversation_id) return;

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      function callback(newData) {
        queryClient.setQueryData(
          ["friend", friendUserId, conversation_id],
          (prevData) => {
            const existingOptimisticMessage = prevData?.pages[0]?.find(
              (message) => message?.id === newData?.id,
            );

            if (!existingOptimisticMessage) {
              // Only update if no optimistic message exists
              return {
                ...prevData,
                // add the new message to the first page's data
                pages: prevData.pages.slice().map((page, index) => {
                  // console.log("page", index, page);
                  return index === 0 ? [...page, newData] : page;
                }),
              };
            }

            if (existingOptimisticMessage) {
              // replace existing optimistic message with server new message
              return {
                ...prevData,
                // replace the new message to the first page's data which id matches the optimistic message
                pages: prevData.pages
                  .slice()
                  .map((page, index) =>
                    index === 0
                      ? page.map((message) =>
                          message.id === newData.id ? newData : message,
                        )
                      : page,
                  ),
              };
            }
          },
        );
      }

      subscriptionRef.current = subscribeRealtimeMessage({
        conversation_id,
        callback,
      });

      return () => {
        subscriptionRef.current?.unsubscribe();
        // console.log("unsubscribed message");
      };
    },
    [conversation_id, friendUserId, queryClient],
  );

  return {
    pages,
    isFetching,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
