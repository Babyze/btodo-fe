import { TASK_STATUS } from "@/utils/constants/task.constant";

export interface ITask {
  taskID: number;
  taskName: string;
  status: TASK_STATUS;
  createdAt: Date;
  updatedAt: Date;
}