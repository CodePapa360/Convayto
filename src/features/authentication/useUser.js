import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "./apiAuth";

export function useUser() {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = data?.session?.user;

  const invalidateUser = () => {
    queryClient.invalidateQueries("user");
  };

  return {
    isLoading,
    session: data?.session,
    user,
    isAuthenticated: user?.role === "authenticated",
    invalidateUser,
  };
}
