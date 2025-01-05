import { toaster } from "@/components/ui/toaster";
import { ISigninRequest } from "@/services/apis/auth.api";
import { AuthError } from "next-auth";
import { signInModel } from "./signin.model";

async function SigninPresenter(payload: ISigninRequest) {
  const response = await signInModel(payload);
  const result = JSON.parse(response) as string | AuthError;
  if (typeof result === "string") {
    toaster.create({
      title: "Signin Successfully",
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

export { SigninPresenter };
