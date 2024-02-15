import { getMessageById, getUserById } from "./apiAuth";
import supabase from "./supabase";

export function subscribeRealtimeMessage({ conversation_id, callback }) {
  // console.log("Got here", conversation_id);

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

  console.log("subscribed message", conversation_id);

  return subscription;
}

//////////////////

async function getUpdatedPayload({ payload, myUserId }) {
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

    return updatedPaylod;
  } else if (payload.eventType === "UPDATE") {
    const messageId = payload.new.last_message_id;
    const messages = await getMessageById(messageId);

    const updatedPaylod = {
      ...payload,
      new: { ...payload.new, messages },
    };

    return updatedPaylod;
  }
}

export function subscribeRealtimeConversation({ myUserId, onUpdate }) {
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
        const updatedPayload = await getUpdatedPayload({ payload, myUserId });
        onUpdate(updatedPayload);
      },
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
        filter: `user2_id=eq.${myUserId}`,
      },
      async (payload) => {
        const updatedPayload = await getUpdatedPayload({ payload, myUserId });
        onUpdate(updatedPayload);
      },
    )
    .subscribe();

  // console.log("subscribed conversations", myUserId);
  return subscription;
}
