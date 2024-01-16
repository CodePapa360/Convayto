import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services/apiProfileUpdate";

export function useUpdatePassword() {
  const {
    mutate: updatePassword,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateProfile,
  });

  return { isUpdating, updatePassword, error };
}
