import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = data?.session?.user;
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
