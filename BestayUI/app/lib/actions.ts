"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Неверный код. Попробуйте еще раз";
        default:
          return "Что-то пошло не так";
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Неверный код. Попробуйте еще раз";
        default:
          return "Что-то пошло не так";
      }
    }
    throw error;
  }
}
