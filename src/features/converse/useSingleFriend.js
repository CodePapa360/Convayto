import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleFriendDetail } from "../../services/apiAuth";

export function useSingleFriend() {
  const { userId: friendUserId, error } = useParams();

  const { data: friend, isPending } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getSingleFriendDetail({ friendUserId }),
  });

  if (error) {
    console.error(
      "Error fetching conversations(from custom hook):",
      error.message
    );
  }

  return { friend, isPending };
}
