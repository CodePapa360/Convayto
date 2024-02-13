import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { id: conversation_id } = currentConversation;
  const { userId: friendUserId } = useParams();

  //If the current conversation is null then do below
  // 1. check if the conversation already existts in the conversations state
  // 2. If it does then set the current conversation to that conversation
  // 3. If it does not then check if "friend" is available in the current conversation

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
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
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
