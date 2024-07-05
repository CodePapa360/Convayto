import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "./apiMessage";
import { useEffect } from "react";
import useConvInfo from "./useConvInfo";
import useMessageSubscription from "./useMessageSubscription";

export function useMessages() {
  const {
    convInfo,
    isPending: isPendingConvInfo,
    error: convError,
  } = useConvInfo();

  const conversation_id = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;

  const queryClient = useQueryClient();

  // Clear the cache when the conversation changes
  useEffect(() => {
    queryClient.setQueryData(["friend", friendUserId], (prev) => {
      if (!prev || !prev.pages[1]?.length) return;

      return {
        pages: prev.pages.slice(0, 1),
        pageParams: prev.pageParams.slice(0, 1),
      };
    });
  }, [friendUserId, queryClient, conversation_id]);

  const {
    data: { pages } = {},
    error: messagesError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading: isLoadingMessages,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["friend", friendUserId],
    queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),

    select: (data) => {
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
    // it should depend and wait untill the conversation_id and friendUserId are available
    enabled: !!friendUserId,
  });

  // Realtime subscription //
  useMessageSubscription({ conversation_id, friendUserId });

  const isLoading = isPendingConvInfo || isLoadingMessages;

  return {
    pages,
    isFetching,
    isPending,
    isLoading,
    error: convError || messagesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
