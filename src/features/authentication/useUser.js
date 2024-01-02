import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = data?.session?.user;

  const updateUser = async () => {
    // Manually refetch user data to ensure it's up-to-date
    await refetch();
  };

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    updateUser,
  };
}
