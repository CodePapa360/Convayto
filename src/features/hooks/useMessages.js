import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { conversation_id } = currentConversation.messages;
  const { userId: friendUserId } = useParams();

  const { data, fetchNextPage, hasNextPage, isPending, isFetching, error } =
    useInfiniteQuery({
      queryKey: ["friend", friendUserId],
      queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPageParam + 1,
    });

  if (error) {
    console.error(
      "Error fetching conversations (from custom hook)",
      error.message,
    );
  }

  return {
    data,
    isPending,
    error,
    fetchNextPage,
  };
}
