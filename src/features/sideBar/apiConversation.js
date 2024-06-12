import supabase from "../../services/supabase";

export async function getConversationEntries({ myUserId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`user1_id.eq.${myUserId},user2_id.eq.${myUserId}`)
    .order("last_message->created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

//////////////
/////////////

export async function getConversations({ myUserId }) {
  const data = await getConversationEntries({ myUserId });

  // Extract friend IDs
  const friendsIds = data.map((frnd) =>
    frnd.user1_id === myUserId ? frnd.user2_id : frnd.user1_id,
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
      friendInfo: user,
      ...msg,
    };
  });

  return combinedArray;
}
