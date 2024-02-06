import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useEffect } from "react";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { conversation_id } = currentConversation.messages;
  const { userId: friendUserId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["friend", friendUserId], (prev) => {
      // console.log("prev", prev);
      if (prev?.pages.lenth < 2 || !prev) return;

      return prev
        ? { pages: [prev.pages[0]], pageParams: [prev.pageParams[0]] }
        : undefined;
    });
  }, [friendUserId, queryClient]);

  const { data, fetchNextPage, hasNextPage, isPending, isFetching, error } =
    useInfiniteQuery({
      queryKey: ["friend", friendUserId],
      queryFn: ({ pageParam }) => getMessages({ conversation_id, pageParam }),
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) =>
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
