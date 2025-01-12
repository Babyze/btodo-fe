import { IResponse } from "@/models/response";
import { ITask } from "@/models/task/task.model";
import { privateAPIHttpServices } from "../http-service";
import { API_ROUTES } from "@/routes";
import { TASK_STATUS } from "@/utils/constants/task.constant";

export class TaskAPI {
  async getTaskList(
    payload: IGetTaskListRequest,
  ): Promise<IResponse<IGetTaskListResponse>> {
    return privateAPIHttpServices.httpGetRequest<IGetTaskListResponse>(
      API_ROUTES.GET_TASK_LIST.replace(":todoID", payload.todoID.toString()),
    );
  }

  async createTask(
    todoID: number,
    payload: ICreateTaskRequest,
  ): Promise<IResponse<ICreateTaskResponse>> {
    return privateAPIHttpServices.httpPostRequest<
      ICreateTaskRequest,
      ICreateTaskResponse
    >(API_ROUTES.CREATE_TASK.replace(":todoID", todoID.toString()), payload);
  }

  async deleteTask(
    payload: IDeleteTaskRequest,
  ): Promise<IResponse<IDeleteTaskResponse>> {
    return privateAPIHttpServices.httpDeleteRequest<IDeleteTaskResponse>(
      API_ROUTES.DELETE_TASK.replace(
        ":todoID",
        payload.todoID.toString(),
      ).replace(":taskID", payload.taskID.toString()),
    );
  }

  async updateTask(
    payload: IUpdateTaskRequest,
  ): Promise<IResponse<IUpdateTaskResponse>> {
    return privateAPIHttpServices.httpPutRequest<
      IUpdateTaskBodyRequest,
      IUpdateTaskResponse
    >(
      API_ROUTES.UPDATE_TASK.replace(
        ":todoID",
        payload.todoID.toString(),
      ).replace(":taskID", payload.taskID.toString()),
      {
        status: payload.status,
      },
    );
  }
}

interface IGetTaskListRequest {
  todoID: number;
}
interface IGetTaskListResponse {
  tasks: ITask[];
}

interface ICreateTaskRequest {
  name: string;
}
type ICreateTaskResponse = ITask;

interface IDeleteTaskRequest {
  todoID: number;
  taskID: number;
}
type IDeleteTaskResponse = ITask;

interface IUpdateTaskParamsRequest {
  todoID: number;
  taskID: number;
}
interface IUpdateTaskBodyRequest {
  status: TASK_STATUS;
}
type IUpdateTaskRequest = IUpdateTaskParamsRequest & IUpdateTaskBodyRequest;
type IUpdateTaskResponse = ITask;

const TaskAPIService = new TaskAPI();

export {
  TaskAPIService,
  type IGetTaskListRequest,
  type IGetTaskListResponse,
  type ICreateTaskRequest,
  type ICreateTaskResponse,
  type IDeleteTaskRequest,
  type IDeleteTaskResponse,
  type IUpdateTaskParamsRequest,
  type IUpdateTaskBodyRequest,
  type IUpdateTaskRequest,
  type IUpdateTaskResponse,
};
