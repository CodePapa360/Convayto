import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";

export function useConversatoins() {
  const { user } = useUser();

  const { data, isPending, error } = useQuery({
    queryKey: ["conversations", user.id],
    queryFn: () => getConversations({ myUserId: user.id }),
  });

  if (error) {
    console.error("Error fetching conversations:", error.message);
  }

  return { data, isPending };
}
