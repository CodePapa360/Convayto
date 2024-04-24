import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout as signoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signout, isPending } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/signin", { replace: true });
    },
  });

  return { signout, isPending };
}
