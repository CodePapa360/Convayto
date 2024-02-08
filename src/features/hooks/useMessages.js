import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useEffect, useState } from "react";
import { MAX_MESSAGES_PER_PAGE } from "../../config";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { conversation_id } = currentConversation.messages;
  const { userId: friendUserId } = useParams();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["friend", friendUserId], (prev) => {
      if (!prev) return;
      return {
        pages: prev.pages.slice(0, 1),
        pageParams: prev.pageParams.slice(0, 1),
      };
    });
  }, [friendUserId, queryClient]);

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
    queryKey: ["friend", friendUserId],
    queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
    keepPreviousData: true,
  });

  console.log(isFetchingNextPage, "isFetchingNextPage");

  if (error) {
    console.error(
      "Error fetching conversations (from custom hook)",
      error.message,
    );
  }

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
