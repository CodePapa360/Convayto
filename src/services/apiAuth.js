import supabase from "./supabase";

export async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
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

export async function sendMessage(convId, newMessage) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ conversation_id: convId, content: newMessage }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function createConversation(id) {
  const { data: conversations, error: convError } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_2_id", `${id}`);

  if (!conversations.length) {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_2_id: id }])
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
