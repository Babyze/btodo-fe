import { TodoAPIService } from "@/services/apis/todo.api";

export async function getTodoListModel() {
  const result = await TodoAPIService.getTodoList();
  return result.message;
}
