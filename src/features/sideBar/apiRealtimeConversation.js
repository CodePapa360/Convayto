import supabase from "../../services/supabase";
import { getUserById } from "../authentication/apiAuth";

async function getUpdatedPayload({ payload, myUserId }) {
  if (payload.eventType === "INSERT") {
    const friendId =
      payload.new.user1_id === myUserId
        ? payload.new.user2_id
        : payload.new.user1_id;

    const friendInfo = await getUserById(friendId);

    const updatedPaylod = {
      ...payload,
      new: { friendInfo, ...payload.new },
    };

    return updatedPaylod;
  } else if (payload.eventType === "UPDATE") {
    const updatedPaylod = {
      ...payload,
      new: { ...payload.new },
    };

    return updatedPaylod;
  }
}

export function subscribeRealtimeConversation({ myUserId, callback }) {
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
        callback(updatedPayload);
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
        callback(updatedPayload);
      },
    )
    .subscribe();

  // console.log("subscribed conversations", myUserId);
  return subscription;
}
