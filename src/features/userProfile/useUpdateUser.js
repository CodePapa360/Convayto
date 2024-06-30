import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "./apiUserAccount";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const navigate = useNavigate();
  const quryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onMutate: () => {
      toast.loading("Updating...");
    },
    onSuccess: () => {
      quryClient.invalidateQueries("user");
      navigate("/");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
