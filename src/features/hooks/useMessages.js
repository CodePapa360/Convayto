import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { conversation_id } = currentConversation.messages;
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
    queryKey: ["friend", friendUserId],
    queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
    useEffect: false,
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
