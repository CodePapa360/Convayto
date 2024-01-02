import supabase from "./supabase";

export async function updateProfile(dataObj) {
  const { data, error } = await supabase.auth.updateUser(dataObj);

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}
