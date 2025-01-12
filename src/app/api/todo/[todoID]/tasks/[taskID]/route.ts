import {
  IDeleteTaskRequest,
  IUpdateTaskBodyRequest,
  IUpdateTaskParamsRequest,
  TaskAPIService,
} from "@/services/apis/task.api";

export async function DELETE(
  request: Request,
  { params }: { params: IDeleteTaskRequest },
) {
  const result = await TaskAPIService.deleteTask(params);
  return new Response(JSON.stringify(result));
}

export async function PUT(
  request: Request,
  { params }: { params: IUpdateTaskParamsRequest },
) {
  const body = (await request.json()) as IUpdateTaskBodyRequest;
  const result = await TaskAPIService.updateTask({
    ...params,
    ...body,
  });
  return new Response(JSON.stringify(result));
}
