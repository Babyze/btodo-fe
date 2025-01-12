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

  GET_TODO_LIST = "/todo",
  CREATE_TODO = "/todo",
  DELETE_TODO = "/todo/:todoID",

  GET_TASK_LIST = "/todo/:todoID/tasks",
  CREATE_TASK = "/todo/:todoID/tasks",
  DELETE_TASK = "/todo/:todoID/tasks/:taskID",
  UPDATE_TASK = "/todo/:todoID/tasks/:taskID",
}

export enum NEXT_API_ROUTES {
  BASE_API_END_POINT = "/api",

  GET_TODO_LIST = `${BASE_API_END_POINT}/todo`,
  CREATE_TODO = `${BASE_API_END_POINT}/todo`,
  DELETE_TODO = `${BASE_API_END_POINT}/todo/:todoID`,

  GET_TASK_LIST = `${BASE_API_END_POINT}/todo/:todoID/tasks`,
  CREATE_TASK = `${BASE_API_END_POINT}/todo/:todoID/tasks`,
  DELETE_TASK = `${BASE_API_END_POINT}/todo/:todoID/tasks/:taskID`,
  UPDATE_TASK = `${BASE_API_END_POINT}/todo/:todoID/tasks/:taskID`,
}

export const publicRoutes: string[] = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];
