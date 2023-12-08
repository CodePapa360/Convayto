import supabase from "./supabase";

// async function storeUser(newUser) {
//   const { data, error } = await supabase
//     .from("pub_users")
//     .insert([{ user_id: newUser.session.user.id }])
//     .select();

//   if (error) throw new Error(error.message);
//   return data;
// }

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

  // storeUser(data);
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
