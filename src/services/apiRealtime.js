import supabase from "./supabase";

export function subscribeRealtime({ conversationId, callback }) {
  if (!conversationId) return;
  const roomName = conversationId;

  const subscription = supabase
    .channel(roomName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  console.log("subscribed", conversationId);

  return subscription;
}
