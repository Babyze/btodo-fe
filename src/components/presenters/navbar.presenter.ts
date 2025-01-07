"use server";
import { signOut } from "@/lib/auth/index.auth";

export async function signOutPresenter() {
  await signOut();
}
