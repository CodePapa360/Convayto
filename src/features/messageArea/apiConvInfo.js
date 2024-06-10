import supabase from "../../services/supabase";

export async function getConvInfoById({ myUserId, friendUserId }) {
  // get user by id first
  const { data: friend, error: friendError } = await supabase
    .from("users")
    .select("*")
    .eq("id", friendUserId);

  if (friendError)
    throw new Error("User doesn't exist!😢", friendError.message);

  // Check for previous conversation
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .in("user1_id", [myUserId, friendUserId])
    .in("user2_id", [myUserId, friendUserId]);

  if (error) {
    throw new Error(error.message);
  }

  // Return conversation ID if there is a previous conversation, otherwise null
  const convInfo = data.length > 0 ? data[0] : null;

  const finalData = { ...convInfo, friendInfo: friend[0] };

  return finalData;
}
