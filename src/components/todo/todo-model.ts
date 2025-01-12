import { NEXT_API_ROUTES } from "@/routes";
import {
  ICreateTaskRequest,
  ICreateTaskResponse,
  IDeleteTaskRequest,
  IGetTaskListRequest,
  IGetTaskListResponse,
  IUpdateTaskBodyRequest,
  IUpdateTaskRequest,
  IUpdateTaskResponse,
} from "@/services/apis/task.api";
import {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDeleteTodoRequest,
  IDeleteTodoResponse,
  IGetTodoListResponse,
} from "@/services/apis/todo.api";
import { privateNextAPIHttpServices } from "@/services/http-service";
import { throwError } from "@/utils/throw-error/index.util";

export async function getTodoList(): Promise<IGetTodoListResponse | null> {
  try {
    const response =
      await privateNextAPIHttpServices.httpGetRequest<IGetTodoListResponse>(
        NEXT_API_ROUTES.GET_TODO_LIST,
      );

    return response.message;
  } catch (err: any) {
    throwError("GET_TODO_LIST", err.message);
    return null;
  }
}

export async function createTodo(
  payload: ICreateTodoRequest,
): Promise<ICreateTodoResponse | null> {
  try {
    const response = await privateNextAPIHttpServices.httpPostRequest<
      ICreateTodoRequest,
      ICreateTodoResponse
    >(NEXT_API_ROUTES.CREATE_TODO, payload);
    return response.message;
  } catch (err: any) {
    throwError("CREATE_TODO", err.message);
    return null;
  }
}

export async function deleteTodo(
  payload: IDeleteTodoRequest,
): Promise<IDeleteTodoResponse | null> {
  try {
    const response =
      await privateNextAPIHttpServices.httpDeleteRequest<IDeleteTodoResponse>(
        NEXT_API_ROUTES.DELETE_TODO.replace(
          ":todoID",
          payload.todoID.toString(),
        ),
      );
    return response.message;
  } catch (err: any) {
    throwError("DELETE_TODO", err.message);
    return null;
  }
}

export async function getTaskList(
  payload: IGetTaskListRequest,
): Promise<IGetTaskListResponse | null> {
  try {
    const response =
      await privateNextAPIHttpServices.httpGetRequest<IGetTaskListResponse>(
        NEXT_API_ROUTES.GET_TASK_LIST.replace(
          ":todoID",
          payload.todoID.toString(),
        ),
      );
    return response.message;
  } catch (err: any) {
    throwError("GET_TASK_LIST", err.message);
    return null;
  }
}

export async function createTask(
  todoID: number,
  payload: ICreateTaskRequest,
): Promise<ICreateTaskResponse | null> {
  try {
    const response = await privateNextAPIHttpServices.httpPostRequest<
      ICreateTaskRequest,
      ICreateTaskResponse
    >(
      NEXT_API_ROUTES.GET_TASK_LIST.replace(":todoID", todoID.toString()),
      payload,
    );
    return response.message;
  } catch (err: any) {
    throwError("CREATE_TASK", err.message);
    return null;
  }
}

export async function deleteTask(
  payload: IDeleteTaskRequest,
): Promise<IDeleteTodoResponse | null> {
  try {
    const response =
      await privateNextAPIHttpServices.httpDeleteRequest<IDeleteTodoResponse>(
        NEXT_API_ROUTES.DELETE_TASK.replace(
          ":todoID",
          payload.todoID.toString(),
        ).replace(":taskID", payload.taskID.toString()),
      );
    return response.message;
  } catch (err: any) {
    throwError("DELETE_TASK", err.message);
    return null;
  }
}

export async function updateTask(
  payload: IUpdateTaskRequest,
): Promise<IUpdateTaskResponse | null> {
  try {
    const response = await privateNextAPIHttpServices.httpPutRequest<
      IUpdateTaskBodyRequest,
      IUpdateTaskResponse
    >(
      NEXT_API_ROUTES.UPDATE_TASK.replace(
        ":todoID",
        payload.todoID.toString(),
      ).replace(":taskID", payload.taskID.toString()),
      {
        status: payload.status,
      },
    );
    return response.message;
  } catch (err: any) {
    throwError("UPDATE_TASK", err.message);
    return null;
  }
}
