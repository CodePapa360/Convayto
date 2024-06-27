import { MAXIMUM_AVATAR_FILE_SIZE } from "../../config";
import supabase, { supabaseUrl } from "../../services/supabase";

export async function updateCurrentUser({
  password,
  fullname,
  username,
  bio,
  avatar,
  previousAvatar,
}) {
  // 1. Update password OR fullname
  let updateData;

  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };
  if (username) updateData = { data: { username } };
  if (bio) updateData = { data: { bio } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    if (storageError.statusCode == 413) {
      throw new Error(
        `The file is too large. It should be less than ${MAXIMUM_AVATAR_FILE_SIZE}MB.`,
      );
    } else {
      throw new Error(storageError.message);
    }
  }

  //3. Update the avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  //4. Delete the previous avatar
  if (previousAvatar) {
    const fileName = previousAvatar.split("avatars/")[1];

    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([fileName]);
    if (deleteError) throw new Error(deleteError.message);
  }

  return updatedUser;
}

///////////////////////

export async function sendPasswordResetEmail({ email, redirectTo }) {
  let { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) throw new Error(error.message);

  return null;
}
