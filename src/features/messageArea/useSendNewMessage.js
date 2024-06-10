import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "./apiMessage";
import useConvInfo from "./useConvInfo";

export function useSendNewMessage() {
  const queryClient = useQueryClient();
  const { convInfo, isPending, isError } = useConvInfo();

  const conversation_id = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;

  const { mutate: sendNewMessage, isPending: isSending } = useMutation({
    mutationFn: sendMessage,

    // When mutate is called:
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["friend", friendUserId, conversation_id],
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([
        "friend",
        friendUserId,
        conversation_id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["friend", friendUserId, conversation_id],
        (oldMessages) => {
          // console.log(oldMessages);

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
        },
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    onError: (err) => console.log(err.message),
  });

  return { isSending, sendNewMessage };
}
