import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "./apiMessage";
import useConvInfo from "./useConvInfo";

export function useSendNewMessage() {
  const queryClient = useQueryClient();
  const { convInfo, isPending, isError } = useConvInfo();

  const friendUserId = convInfo?.friendInfo?.id;

  const { mutate: sendNewMessage, isPending: isSending } = useMutation({
    mutationFn: sendMessage,

    // When mutate is called:
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["friend", friendUserId],
      });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([
        "friend",
        friendUserId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["friend", friendUserId], (oldMessages) => {
        return {
          ...oldMessages,
          pages: oldMessages?.pages
            .slice()
            .map((page, index) =>
              index === 0
                ? !page
                  ? [newMessage]
                  : [...page, newMessage]
                : page,
            ),
        };
      });

      // Return a context object with the snapshotted value
      return { previousMessages };
    },

    onError: (err) => console.log(err.message),
  });

  return { isSending, sendNewMessage };
}
