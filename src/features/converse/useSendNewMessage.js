import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../services/apiAuth";

export function useSendNewMessage() {
  const { mutate: sendNewMessage, isPending: isSending } = useMutation({
    mutationFn: sendMessage,
    onError: (err) => console.log(err.message),
  });

  return { isSending, sendNewMessage };
}
