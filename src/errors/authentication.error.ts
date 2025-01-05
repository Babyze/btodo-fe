import { HttpStatusCode } from "axios";
import { CredentialsSignin } from "next-auth";

export class InvalidParameterSigninErrorr extends CredentialsSignin {
  constructor(code = HttpStatusCode.BadRequest, message = "Invalid parameter") {
    super();
    this.code = code.toString();
    this.message = message;
  }
}

export class InvalidSigninError extends CredentialsSignin {
  constructor(
    code = HttpStatusCode.Unauthorized,
    message = "Invalid signin information",
  ) {
    super();
    this.code = code.toString();
    this.message = message;
  }
}
