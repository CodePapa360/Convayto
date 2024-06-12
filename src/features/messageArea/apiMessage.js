import { MAX_MESSAGES_PER_PAGE } from "../../config";
import supabase from "../../services/supabase";

export async function getMessages({ conversation_id, pageParam = 0 }) {
  const limit = MAX_MESSAGES_PER_PAGE;
  const from = pageParam * limit;
  const to = from + limit - 1;

  if (!conversation_id) return;

  const query = supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: false })
    .range(from, to);

  const { data: messages, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const messagesReversed = messages.reverse();

  return messagesReversed;
}

////////////////
export async function getMessageById(messageId) {
  if (!messageId) return null;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", messageId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

//////////////////

export async function openConversation(friendUserId) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user2_id: friendUserId }])
    .select();

  if (error) throw new Error(error.message);
  const conversationId = data[0].id;
  return conversationId;
}

////////////////////

export async function sendMessage({
  id,
  conversation_id,
  content,
  friendUserId,
}) {
  let convId = conversation_id;

  if (!convId) {
    const newConvId = await openConversation(friendUserId);
    convId = newConvId;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ id, conversation_id: convId, content }])
    .select();

  if (error) throw new Error(error.message);

  const { error: conversationError } = await supabase
    .from("conversations")
    .update({ last_message: data[0] })
    .eq("id", convId);

  if (conversationError) throw new Error(conversationError.message);

  return data[0];
}
