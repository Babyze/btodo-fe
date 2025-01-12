import { toaster } from "@/components/ui/toaster";
import { IGetTodoListResponse } from "@/services/apis/todo.api";
import { QueryKey } from "@/utils/constants/query-key.constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  createTodo,
  deleteTask,
  deleteTodo,
  getTaskList,
  getTodoList,
  updateTask,
} from "./todo-model";
import {
  ICreateTaskRequest,
  IDeleteTaskRequest,
  IGetTaskListRequest,
  IGetTaskListResponse,
  IUpdateTaskRequest,
} from "@/services/apis/task.api";

export function useTodoTabsPresenter() {
  return useQuery<IGetTodoListResponse | null>({
    queryKey: [QueryKey.GET_TODO_LIST],
    queryFn: getTodoList,
  });
}

export function useCreateTodoPresenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKey.CREATE_TODO],
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_TODO_LIST],
      });
      toaster.create({
        title: "Create todo successfully",
        type: "success",
      });
    },
  });
}

export function useDeleteTodoPresenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKey.DELETE_TODO],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_TODO_LIST],
      });
      toaster.create({
        title: "Delete todo successfully",
        type: "success",
      });
    },
  });
}

export function useTodoContentPresenter(payload: IGetTaskListRequest) {
  return useQuery<IGetTaskListResponse | null>({
    queryKey: [QueryKey.GET_TASK_LIST, payload.todoID],
    queryFn: () => getTaskList(payload),
  });
}

export function useTodoInputPresenter(todoID: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.CREATE_TASK],
    mutationFn: (payload: ICreateTaskRequest) => createTask(todoID, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_TASK_LIST, todoID],
      });
      toaster.create({
        title: "Create task successfully",
        type: "success",
      });
    },
  });
}

export function useDeleteTaskPresenter(todoID: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.DELETE_TASK],
    mutationFn: (payload: IDeleteTaskRequest) => deleteTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_TASK_LIST, todoID],
      });
      toaster.create({
        title: "Delete task successfully",
        type: "success",
      });
    },
  });
}

export function useUpdateTaskPresenter(todoID: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.UPDATE_TASK],
    mutationFn: (payload: IUpdateTaskRequest) => updateTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_TASK_LIST, todoID],
      });
      toaster.create({
        title: "Update task successfully",
        type: "success",
      });
    },
  });
}
