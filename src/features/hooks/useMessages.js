import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";

export function useMessages() {
  const { currentConversation, setCurrentConversation } = useAppData();
  const conversation_id = currentConversation?.id;
  const { userId: friendUserId } = useParams();

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
