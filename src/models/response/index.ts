import { HttpStatusCode } from "axios";

export interface IResponse<T> {
  statusCode: HttpStatusCode;
  message: T;
}

export interface IResponseError {
  statusCode: HttpStatusCode;
  message: string;
}
