import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = data?.session?.user;

  const updateUser = async () => {
    await refetch();
  };

  return {
    isLoading,
    session: data?.session,
    user,
    isAuthenticated: user?.role === "authenticated",
    updateUser,
  };
}
