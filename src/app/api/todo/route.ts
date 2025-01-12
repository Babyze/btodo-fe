import { ICreateTodoRequest, TodoAPIService } from "@/services/apis/todo.api";

export async function GET() {
  const todo = await TodoAPIService.getTodoList();
  return new Response(JSON.stringify(todo));
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ICreateTodoRequest;
  const result = await TodoAPIService.createTodo(payload);
  return new Response(JSON.stringify(result));
}
