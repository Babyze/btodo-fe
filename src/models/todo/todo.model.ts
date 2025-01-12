import { TODO_STATUS } from "@/utils/constants/todo.constant";

export interface ITodo {
  todoID: number;
  todoName: string;
  status: TODO_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
