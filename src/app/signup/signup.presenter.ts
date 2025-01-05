import { toaster } from "@/components/ui/toaster";
import { ISigninRequest } from "@/services/apis/auth.api";
import { AuthError } from "next-auth";
import { signUpModel } from "./signup.model";

async function SignupPresenter(payload: ISigninRequest) {
  const response = await signUpModel(payload);
  const result = JSON.parse(response) as string | AuthError;
  if (typeof result === "string") {
    toaster.create({
      title: "Signup Successfully",
      type: "success",
    });
    return result;
  }

  toaster.create({
    title: "Error",
    description: result.message,
    type: "error",
  });
  return "";
}

export { SignupPresenter };
