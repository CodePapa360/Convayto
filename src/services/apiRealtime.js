import supabase from "./supabase";

export function subscribeRealtime({ conversationId, myUserId }) {
  const room = `${myUserId}-${conversationId}`;

  console.log("subscribed with", room);

  const subscription = supabase
    .channel(room)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  return subscription;
}
