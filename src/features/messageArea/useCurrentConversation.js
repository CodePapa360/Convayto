import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getConversationById } from "../sideBar/apiConversation";
import { useUser } from "../authentication/useUser";

function useCurrentConversation() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();
  const myUserId = user?.id;

  const {
    data: currentConversation,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["currentConversation", friendUserId],
    queryFn: () => getConversationById({ myUserId, friendUserId }),
  });

  return { currentConversation, isPending, isError };
}

export default useCurrentConversation;
