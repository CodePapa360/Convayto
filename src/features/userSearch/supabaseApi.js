import supabase from "../../services/supabase";

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
