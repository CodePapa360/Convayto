import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiProfileUpdate";

export function useUpdateUser() {
  const quryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      //   toast.success("User account successfully updated.");
      quryClient.invalidateQueries("user");
    },
    onError: (err) => {
      //   toast.error(err.message);
      console.log(err.message);
    },
  });

  return { updateUser, isUpdating };
}
