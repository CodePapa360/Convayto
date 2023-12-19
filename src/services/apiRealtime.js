import { getMessageById, getUserById } from "./apiAuth";
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
  // conversationIds,
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
        filter: `user1_id=eq.${myUserId}`,
      },
      async (payload) => {
        if (payload.eventType === "INSERT") {
          const messageId = payload.new.last_message_id;
          const friendId =
            payload.new.user1_id === myUserId
              ? payload.new.user2_id
              : payload.new.user1_id;

          const messages = await getMessageById(messageId);
          const friend = await getUserById(friendId);

          const updatedPaylod = {
            ...payload,
            new: { friend, messages, ...payload.new },
          };

          onUpdate(updatedPaylod);
        } else if (payload.eventType === "UPDATE") {
          const messageId = payload.new.last_message_id;
          const messages = await getMessageById(messageId);

          const updatedPaylod = {
            ...payload,
            new: { ...payload.new, messages },
          };

          onUpdate(updatedPaylod);
        }
      }
    )
    .subscribe();

  console.log("subscribed conversations", myUserId);
  return subscription;
}
