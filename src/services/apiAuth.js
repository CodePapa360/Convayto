import supabase from "./supabase";

export async function signup({ email, password, fullname, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        username,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
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
    frnd.user1_id === myUserId ? frnd.user2_id : frnd.user1_id
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
export async function getSingleFriendDetail({ friendUserId }) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", friendUserId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
////////////////

export async function getMessages({ myUserId, friendUserId }) {
  const conversationId = await hasPreviousConversation({
    myUserId,
    friendUserId,
  });

  const frindDetails = await getSingleFriendDetail({ friendUserId });

  if (!conversationId)
    return { frindDetails, messages: null, conversationId: null };

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId);

  if (error) {
    throw new Error(error.message);
  }

  return { frindDetails, messages, conversationId };
}

////////////////
export async function getMessageById(messageId) {
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
  // const { data: conversations, error: convError } = await supabase
  //   .from("conversations")
  //   .select("*")
  //   .eq("user_2_id", `${friendUserId}`);

  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user_2_id: friendUserId }])
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

  // if (convId === null) {
  //   convId = await openConversation({ friendUserId });
  // }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ id, conversation_id: convId, content }])
    .select();

  if (error) throw new Error(error.message);

  // update conversation table with the last message id
  const { data: updatedRow, error: updatedError } = await supabase
    .from("conversations")
    .update({ last_message_id: data[0].id })
    .eq("id", conversation_id) // Use the correct variable here
    .select();

  if (updatedError) throw new Error(updatedError.message);

  return data[0];
}

// console.log("message", data);
// console.log("conversation", updatedRow);
///////////

// getMessages({ myUserId, friendUserId });

////////////////////////

/////////////////
// export async function testApi() {
//   const myUserId = "06bd2050-5bbe-4069-95a5-b92e8ce5db71";
//   const friendUserId = "1435f575-0346-47bf-87d4-0d82a972a5ff";

//   // const data = await hasPreviousConversation({ myUserId, friendUserId });

//   const { data, error } = await supabase
//     .from("conversations")
//     .update({ last_message_id: "35d62c8d-4c5d-47b1-bf58-6f500ce1cea8" })
//     .eq("id", "70956ae0-0bc6-475b-a98a-9ea4a7b8b88d")
//     .select();

//   if (error) throw new Error(error.message);

//   console.log(data);
//   return data;
// }

// testApi();

// const myUserId = { myUserId: "06bd2050-5bbe-4069-95a5-b92e8ce5db71" };

// testApi();
// export function getMessages(newMessages) {}
// let data = null;

// export function listenMessages() {
//   supabase
//     .channel("my_messages")
//     .on(
//       "postgres_changes",
//       { event: "INSERT", schema: "public", table: "publicMessages" },
//       (payload) => {
//         console.log(payload);
//       }
//     )
//     .subscribe();
// }
// listenMessages();

export async function searchPeople({ query }) {
  console.log(query);
  let { data: results, error } = await supabase
    .from("users")
    .select("*")
    .or((query) =>
      query
        .or("fullname", "ilike", `%${query}%`)
        .or("username", "ilike", `%${query}%`)
        .or("email", "ilike", `%${query}%`)
    );

  if (error) throw new Error(error.message);

  return results;
}

// // test();
