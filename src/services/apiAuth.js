import { MAX_MESSAGES_PER_PAGE } from "../config";
import supabase from "./supabase";

export async function signup({ email, password, fullname, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        username,
        bio: "Hay there, I'm using ConverseMe!",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  return data;
}

////////////////

export async function getConversationEntries({ myUserId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, messages(*)")
    .or(`user1_id.eq.${myUserId},user2_id.eq.${myUserId}`);

  if (error) throw new Error(error.message);
  return data;
}

export async function getConversations({ myUserId }) {
  const data = await getConversationEntries({ myUserId });

  // Extract friend IDs
  const friendsIds = data.map((frnd) =>
    frnd.user1_id === myUserId ? frnd.user2_id : frnd.user1_id,
  );

  // Fetch user data from Supabase
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .in("id", friendsIds);

  if (error) {
    throw new Error(error.message);
  }

  // Create a mapping object to associate friend IDs with user data
  const usersMapping = {};
  users.forEach((user) => {
    usersMapping[user.id] = user;
  });

  const combinedArray = data.map((msg) => {
    const friendId = msg.user1_id === myUserId ? msg.user2_id : msg.user1_id;
    const user = usersMapping[friendId];

    return {
      friend: user,
      ...msg,
    };
  });

  // console.log("combinedArray", combinedArray);
  return combinedArray;
}

///////////////////
async function hasPreviousConversation({ myUserId, friendUserId }) {
  try {
    // Check for previous conversation
    const { data, error } = await supabase
      .from("conversations")
      .select("id")
      .in("user1_id", [myUserId, friendUserId])
      .in("user2_id", [myUserId, friendUserId]);

    if (error) {
      throw new Error(error.message);
    }

    // Return conversation ID if there is a previous conversation, otherwise null
    const conversationId = data.length > 0 ? data[0].id : null;
    return conversationId;
  } catch (error) {
    console.error("Error in getPreviousConversation:", error.message);
    throw error;
  }
}

///////////////////
export async function getUserById(friendUserId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", friendUserId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
////////////////

export async function getMessages({ conversation_id, pageParam }) {
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

  // console.log("messages", messages);

  const messagesReversed = messages.reverse();

  return { messages: messagesReversed };
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

////////////////
export async function openConversation(friendUserId) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user2_id: friendUserId }])
    .select();

  if (error) throw new Error(error.message);
  const conversationId = data[0].id;
  return conversationId;
}
/////////////
export async function sendMessage({
  id,
  conversation_id,
  content,
  friendUserId,
}) {
  let convId = conversation_id;

  if (convId === null) {
    const newConvId = await openConversation(friendUserId);
    convId = newConvId;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ id, conversation_id: convId, content }])
    .select();

  if (error) throw new Error(error.message);

  // update conversation table with the last message id
  const { error: conversationError } = await supabase
    .from("conversations")
    .update({ last_message_id: data[0].id })
    .eq("id", convId);

  if (conversationError) throw new Error(conversationError.message);

  return data[0];
}

export async function searchPeople(query) {
  let { data: results, error } = await supabase
    .from("users")
    .select("*")
    .or(
      `fullname.ilike.%${query}%,username.ilike.%${query}%,email.ilike.%${query}%`,
    );

  if (error) throw new Error(error.message);

  return results;
}

export async function sendPasswordResetEmail(email) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) throw new Error(error.message);

  return data;
}
