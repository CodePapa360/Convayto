import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useEffect } from "react";

export function useMessages() {
  const { currentConversation } = useAppData();
  const conversation_id = currentConversation?.id;
  const { userId: friendUserId } = useParams();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(
      ["friend", friendUserId, conversation_id],
      (prev) => {
        if (!prev) return;
        if (prev.pages[1]?.length === 0) return;

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
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
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
