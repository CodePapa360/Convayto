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

export async function sendMessage({ conversation_id, content }) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ conversation_id, content }])
    .select();

  if (error) throw new Error(error.message);

  // const { data, error } = await supabase
  // .from("messages")
  // .insert([{ conversation_id, content }])
  // .select();

  console.log(data[0]);

  return data;
}

export async function openConversation(recepentId) {
  const { data: conversations, error: convError } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_2_id", `${recepentId}`);

  if (!conversations.length) {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_2_id: recepentId }])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }

  console.log("Conversations already exist");

  if (convError) throw new Error(convError.message);

  return conversations[0];
}

export async function getConversationEntries({ myUserId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, messages(*)")
    .or(`user1_id.eq.${myUserId},user2_id.eq.${myUserId}`);

  if (error) throw new Error(error.message);
  // console.log(data);
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

  // Combine user data and last messages
  const combinedArray = data.map((msg) => {
    const friendId = msg.user1_id === myUserId ? msg.user2_id : msg.user1_id;
    const user = usersMapping[friendId];
    const lastMessage = msg.messages;

    return {
      user,
      lastMessage,
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

export async function getMessages({ myUserId, friendUserId }) {
  const conversationId = await hasPreviousConversation({
    myUserId,
    friendUserId,
  });

  if (!conversationId) return;

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId);

  if (error) {
    throw new Error(error.message);
  }

  return messages;
}

// const myUserId = "06bd2050-5bbe-4069-95a5-b92e8ce5db71";
// const friendUserId = "a4552a8e-c0d7-4bb6-ac4b-60b16057f46e";

// getMessages({ myUserId, friendUserId });

/////////////////
export async function testApi() {
  const myUserId = "06bd2050-5bbe-4069-95a5-b92e8ce5db71";
  const friendUserId = "1435f575-0346-47bf-87d4-0d82a972a5ff";

  const data = await hasPreviousConversation({ myUserId, friendUserId });
  console.log(data);
}

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

// export async function test(searchTerm) {
//   let { data: users, error } = await supabase.from("users").select("email");

//   if (error) throw new Error(error.message);

//   console.log(users);
//   return users;
// }

// // test();
