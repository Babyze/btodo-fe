import { IResponse } from "@/models/response";
import { ITodo } from "@/models/todo/todo.model";
import { API_ROUTES } from "@/routes";
import { privateAPIHttpServices } from "../http-service";

class TodoAPI {
  async getTodoList(): Promise<IResponse<IGetTodoListResponse>> {
    return privateAPIHttpServices.httpGetRequest<IGetTodoListResponse>(
      API_ROUTES.GET_TODO_LIST,
    );
  }

  async createTodo(
    payload: ICreateTodoRequest,
  ): Promise<IResponse<ICreateTodoResponse>> {
    return privateAPIHttpServices.httpPostRequest<
      ICreateTodoRequest,
      ICreateTodoResponse
    >(API_ROUTES.CREATE_TODO, payload);
  }

  async deleteTodo(
    payload: IDeleteTodoRequest,
  ): Promise<IResponse<IDeleteTodoResponse>> {
    return privateAPIHttpServices.httpDeleteRequest<IDeleteTodoResponse>(
      API_ROUTES.DELETE_TODO.replace(":todoID", payload.todoID.toString()),
    );
  }
}

const TodoAPIService = new TodoAPI();

interface IGetTodoListResponse {
  todo: ITodo[];
}

interface ICreateTodoRequest {
  name: string;
}
type ICreateTodoResponse = ITodo;

interface IDeleteTodoRequest {
  todoID: number;
}
type IDeleteTodoResponse = ITodo;

export {
  TodoAPIService,
  type ICreateTodoRequest,
  type ICreateTodoResponse,
  type IGetTodoListResponse,
  type IDeleteTodoRequest,
  type IDeleteTodoResponse,
};
