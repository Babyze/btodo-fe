import { IResponseError } from "@/models/response";
import { HttpStatusCode } from "axios";

export class ResponseError implements IResponseError {
  statusCode: HttpStatusCode;
  message: string;

  constructor(
    statusCode = HttpStatusCode.NotImplemented,
    message = "Not implemented",
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
