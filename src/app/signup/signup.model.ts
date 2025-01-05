"use server";
import { signIn } from "@/lib/auth/index.auth";
import { ROUTES } from "@/routes";
import { ISignupRequest } from "@/services/apis/auth.api";

export async function signUpModel(payload: ISignupRequest) {
  try {
    const res = await signIn("credentials", {
      ...payload,
      redirect: false,
      redirectTo: ROUTES.HOME,
    });
    return JSON.stringify(res);
  } catch (err) {
    return JSON.stringify(err);
  }
}
