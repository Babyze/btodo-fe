/* eslint-disable no-unused-vars */
/**
 * @ROUTES contains all the routes of the application.
 * That way you can easily change the routes in one place and have a single source of truth.
 *
 * @example
 * `useRouter().push(ROUTES.home);`
 */
export enum ROUTES {
  HOME = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  DASHBOAD = "/dashboard",
}

export enum API_ROUTES {
  SIGN_IN = "/auth/sign-in",
  REFRESH_TOKEN = "/auth/refresh-token",
  SIGN_UP = "/auth/sign-up",
}

export const publicRoutes: string[] = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];
