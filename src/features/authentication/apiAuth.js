import { DEFAULT_BIO } from "../../config";
import supabase from "../../services/supabase";

///////////////////
// Sign up function
///////////////////

export async function signup({
  email,
  password,
  fullname,
  username,
  redirectTo,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        username,
        bio: DEFAULT_BIO,
      },
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    if (error.message === "Anonymous sign-ins are disabled") {
      throw new Error("Please enter your email to sign up.");
    } else {
      throw new Error(error.message);
    }
  }

  return data;
}

///////////////////
// Sign in function
///////////////////

export async function signin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.status === 400) {
      throw new Error(
        "Wrong password or email. Try again or click Forgot password to reset it.",
      );
    } else {
      throw new Error(error.message);
    }
  }

  return data;
}

export async function signout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  return data;
}

////////////

export async function getUserById(friendUserId) {
  if (!friendUserId) return;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", friendUserId);

  if (error) {
    // code: 22P02 = User doesn't exist.

    if (error.code == "22P02") {
      throw new Error("User doesn't exist!");
    } else {
      throw new Error(error.message);
    }
  }

  return data[0];
}
