import { getMessageById } from "./apiAuth";
import supabase from "./supabase";

export function subscribeRealtimeMessage({ conversationId, callback }) {
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
        callback(payload.new);
      }
    )
    .subscribe();

  console.log("subscribed message", conversationId);

  return subscription;
}

//////////////////

export function subscribeRealtimeConversation({
  myUserId,
  conversationIds,
  onUpdate,
}) {
  // if (!myUserId || !conversationIds) return;

  const roomName = myUserId;
  const subscription = supabase
    .channel(roomName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
        filter: `id=in.(${conversationIds.join(",")})`,
      },
      async (payload) => {
        const conversation = payload?.new;
        const conveId = conversation?.last_message_id;
        const messages = await getMessageById(conveId);
        conversation.messages = messages;

        onUpdate(conversation);
      }
    )
    .subscribe();

  console.log("subscribed conversations", myUserId);
  return subscription;
}
