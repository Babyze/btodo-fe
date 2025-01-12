import { ICreateTaskRequest, TaskAPIService } from "@/services/apis/task.api";

export async function GET(
  request: Request,
  { params }: { params: { todoID: number } },
) {
  const result = await TaskAPIService.getTaskList(params);
  return new Response(JSON.stringify(result));
}

export async function POST(
  request: Request,
  { params }: { params: { todoID: number } },
) {
  const body = (await request.json()) as ICreateTaskRequest;
  const result = await TaskAPIService.createTask(params.todoID, body);
  return new Response(JSON.stringify(result));
}
