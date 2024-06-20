import supabase from "../../services/supabase";

export default async function apiCheckUsername(username) {
  if (!username) return;

  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("username", username);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
