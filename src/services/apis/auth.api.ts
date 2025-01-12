import { IResponse } from "@/models/response";
import { API_ROUTES } from "@/routes";
import { publicAPIHttpServices } from "../http-service";

class AuthAPI {
  async signIn(payload: ISigninRequest): Promise<IResponse<ISigninResponse>> {
    return publicAPIHttpServices.httpPostRequest<
      ISigninRequest,
      ISigninResponse
    >(API_ROUTES.SIGN_IN, payload);
  }

  async refreshToken(
    payload: IRefreshTokenRequest,
  ): Promise<IResponse<IRefreshTokenResponse>> {
    return publicAPIHttpServices.httpPostRequest<
      IRefreshTokenRequest,
      IRefreshTokenResponse
    >(API_ROUTES.REFRESH_TOKEN, payload);
  }

  async signUp(payload: ISignupRequest): Promise<IResponse<ISignupResponse>> {
    return publicAPIHttpServices.httpPostRequest<
      ISignupRequest,
      ISignupResponse
    >(API_ROUTES.SIGN_UP, payload);
  }
}

const AuthAPIService = new AuthAPI();

interface ISigninRequest {
  email: string;
  password: string;
  authIntent?: string;
}
interface ISigninResponse {
  accessToken: string;
  refreshToken: string;
  expireDate: number;
}

interface IRefreshTokenRequest {
  refreshToken: string;
}
type IRefreshTokenResponse = ISigninResponse;

interface ISignupRequest {
  email: string;
  password: string;
  authItent?: string;
}

type ISignupResponse = ISigninResponse;

export {
  AuthAPIService,
  type IRefreshTokenRequest,
  type IRefreshTokenResponse,
  type ISigninRequest,
  type ISigninResponse,
  type ISignupRequest,
  type ISignupResponse,
};
