import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "./apiMessage";
import useConvInfo from "./useConvInfo";
import toast from "react-hot-toast";

export function useSendNewMessage() {
  const queryClient = useQueryClient();
  const { convInfo } = useConvInfo();
  const conversationId = convInfo?.id;

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

    onSuccess: (newMessage) => {
      // when conversation id is null, it means the conversation is new. So update the convInfo query data with the new conversation id
      if (!conversationId) {
        queryClient.setQueryData(["convInfo", friendUserId], (prevData) => {
          return {
            ...prevData,
            id: newMessage.conversation_id,
          };
        });
      }
    },

    onError: (error, _, context) => {
      toast.error(error.message);
      // Roll back to the previous value
      queryClient.setQueryData(
        ["friend", friendUserId],
        context.previousMessages,
      );
    },
  });

  return { isSending, sendNewMessage };
}
