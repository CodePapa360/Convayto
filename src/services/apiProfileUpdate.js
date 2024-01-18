import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function updateProfile(dataObj) {
  const { data, error } = await supabase.auth.refetchUser(dataObj);

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function updateCurrentUser({
  password,
  fullName,
  username,
  bio,
  avatar,
}) {
  //1. Update password OR fullname
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  if (username) updateData = { data: { username } };
  if (bio) updateData = { data: { bio } };

  const { data, error } = await supabase.auth.refetchUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3. Update the avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.refetchUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}
