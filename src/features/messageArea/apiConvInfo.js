import supabase from "../../services/supabase";
import { getUserById } from "../authentication/apiAuth";

export async function getConvInfoById({ myUserId, friendUserId }) {
  // get user by id first
  const friend = await getUserById(friendUserId);

  // Check for previous conversation
  const { data: convInfo, error: convInfoError } = await supabase
    .from("conversations")
    .select("*")
    .in("user1_id", [myUserId, friendUserId])
    .in("user2_id", [myUserId, friendUserId]);

  if (convInfoError) throw new Error(convInfoError.message);

  return { ...convInfo[0], friendInfo: friend };
}
