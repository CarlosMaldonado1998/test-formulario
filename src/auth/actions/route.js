"use server";

import { createClient } from "../../utils/supabase/client";
const supabase = createClient();

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    console.log("data aaaa", data)
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function signup(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) throw new Error(error.message);

  return { success: true };
}

export async function logout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.log("Error al cerrar sesión:", error.message);
  }
}
