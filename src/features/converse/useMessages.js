import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";

export function useMessages() {
  const { userId } = useParams();
  const { user } = useUser();

  const { data, isPending, error } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getMessages({ myUserId: user.id, friendUserId: userId }),
  });

  if (error) {
    console.error(
      "Error fetching conversations(from custom hook):",
      error.message
    );
  }

  return { data, isPending };
}
