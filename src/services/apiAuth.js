import supabase from "./supabase";
import { v4 as uuid } from "uuid";

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

export async function sendMessage(newMessage) {
  const { data, error } = await supabase
    .from("publicMessages")
    .insert([{ message: newMessage }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export function getMessages(newMessages) {}
let data = null;

export function listenMessages() {
  supabase
    .channel("my_messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "publicMessages" },
      (payload) => {
        console.log(payload);
      }
    )
    .subscribe();
}
listenMessages();
