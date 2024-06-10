import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "./apiMessage";
import { useEffect, useRef } from "react";
import { subscribeRealtimeMessage } from "./apiRealtimeMessage";
import useConvInfo from "./useConvInfo";

export function useMessages() {
  const { convInfo, isPending: isPendingConvInfo, isError } = useConvInfo();

  const conversation_id = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;

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
    isLoading: isLoadingMessages,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["friend", friendUserId, conversation_id],
    queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),

    select: (data) => {
      console.log("data", data);
      if (!data || data.pages.length < 2) return data;
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
    enabled: !!conversation_id,
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

  const isLoading = isPendingConvInfo || isLoadingMessages;

  return {
    pages,
    isFetching,
    isPending,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
