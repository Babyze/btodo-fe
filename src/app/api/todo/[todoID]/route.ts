import { TodoAPIService } from "@/services/apis/todo.api";

export async function DELETE(
  request: Request,
  { params }: { params: { todoID: number } },
) {
  const result = await TodoAPIService.deleteTodo({
    todoID: params.todoID,
  });
  return new Response(JSON.stringify(result));
}
