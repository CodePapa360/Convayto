import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";

export function useMessages() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();

  const { data, isPending, error } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getMessages({ myUserId: user.id, friendUserId }),
  });

  if (error) {
    console.error(
      "Error fetching conversations(from custom hook):",
      error.message
    );
  }

  return { data, isPending };
}
