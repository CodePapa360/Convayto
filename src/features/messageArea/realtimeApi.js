import supabase from "../../services/supabase";

export function subscribeRealtimeMessage({ conversation_id, callback }) {
  if (!conversation_id) return;

  const roomName = conversation_id;

  const subscription = supabase
    .channel(roomName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversation_id}`,
      },
      (payload) => {
        callback(payload.new);
      },
    )
    .subscribe();

  // console.log("subscribed message", conversation_id);

  return subscription;
}
