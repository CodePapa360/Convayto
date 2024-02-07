import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useParams } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";

export function useMessages() {
  const { currentConversation } = useAppData();
  const { conversation_id } = currentConversation.messages;
  const { userId: friendUserId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getMessages({ conversation_id, pageParam: 0 }),
  });

  const queryClient = useQueryClient();

  async function fetchNextPage() {
    // need try catch //
    const currentPage = queryClient.getQueryData(["friend", friendUserId]);

    const nextPageParam = currentPage.pageParam + 1;
    const nextPageData = await getMessages({
      conversation_id,
      pageParam: nextPageParam,
    });

    queryClient.setQueryData(["friend", friendUserId], {
      ...nextPageData,
      messages: [...nextPageData.messages, ...currentPage.messages],
    });
  }

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
