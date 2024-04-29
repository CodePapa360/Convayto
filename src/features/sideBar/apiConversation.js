import supabase from "../../services/supabase";

export async function getConversationEntries({ myUserId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, messages(*)")
    .or(`user1_id.eq.${myUserId},user2_id.eq.${myUserId}`);

  if (error) throw new Error(error.message);
  return data;
}

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
      friend: user,
      ...msg,
    };
  });

  return combinedArray;
}

///////////////////
export async function getConversationById({ myUserId, friendUserId }) {
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

  // console.log(data);
  // Return conversation ID if there is a previous conversation, otherwise null
  const conversation = data.length > 0 ? data[0] : null;

  const finalData = { conversation, friend: friend[0] };

  return finalData;
}

// getConversationById({
//   myUserId: "06bd2050-5bbe-4069-95a5-b92e8ce5db71",
//   friendUserId: "172df3fe-21d2-4c39-9165-7d670bbbb32f",
// });
