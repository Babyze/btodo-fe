import { IResponse } from "@/models/response";
import { API_ROUTES } from "@/routes";
import { publicHttpServices } from "../http-service";

class AuthAPI {
  async signIn(payload: ISigninRequest): Promise<IResponse<ISigninResponse>> {
    return publicHttpServices.httpPostRequest<ISigninRequest, ISigninResponse>(
      API_ROUTES.SIGN_IN,
      payload,
    );
  }

  async refreshToken(payload: IRefreshTokenRequest) {
    return publicHttpServices.httpPostRequest<
      IRefreshTokenRequest,
      IRefreshTokenResponse
    >(API_ROUTES.REFRESH_TOKEN, payload);
  }
}

const AuthAPIService = new AuthAPI();

interface ISigninRequest {
  email: string;
  password: string;
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

export {
  AuthAPIService,
  type IRefreshTokenRequest,
  type IRefreshTokenResponse,
  type ISigninRequest,
  type ISigninResponse,
};
