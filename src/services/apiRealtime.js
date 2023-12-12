import supabase from "./supabase";

export function subscribeRealtime({
  conversationId,
  myUserId,
  friendUserId,
  queryClient,
}) {
  const room = `${myUserId}-${conversationId}`;

  const subscription = supabase
    .channel(room)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        // Extract the message data from the payload
        const message = payload.new;

        // Update the React Query cache with the new message
        queryClient.setQueryData(["friend", friendUserId], (prevData) => {
          return {
            ...prevData,
            messages: [...(prevData.messages || []), message],
          };
        });
      }
    )
    .subscribe();

  return subscription;
}
