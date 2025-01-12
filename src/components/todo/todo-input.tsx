import { ICreateTaskRequest } from "@/services/apis/task.api";
import { Box, Input } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTodoInputPresenter } from "./useTodoPresenter";

const CreateTaskSchema = Joi.object<ICreateTaskRequest>({
  name: Joi.string().trim().required(),
});

export function TodoInput({ selectedTab }: { selectedTab: string }) {
  const { register, handleSubmit, reset } = useForm<ICreateTaskRequest>({
    resolver: joiResolver(CreateTaskSchema),
  });
  const { mutate, isPending, isSuccess } = useTodoInputPresenter(
    parseInt(selectedTab),
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  function onSubmit(data: ICreateTaskRequest) {
    mutate(data);
  }

  return (
    <Box>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Input
          type="text"
          size="xl"
          placeholder="Enter your plan..."
          variant="outline"
          focusRingColor="teal"
          disabled={isPending}
          {...register("name", { required: "Task is required" })}
        />
      </form>
    </Box>
  );
}
