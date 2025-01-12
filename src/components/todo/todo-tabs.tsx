import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ITodo } from "@/models/todo/todo.model";
import { ICreateTodoRequest } from "@/services/apis/todo.api";
import { Input, Tabs } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import * as Joi from "joi";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import {
  useCreateTodoPresenter,
  useDeleteTodoPresenter,
} from "./useTodoPresenter";
import { useEffect, useState } from "react";
import { AsyncRenderer } from "@/components/ui/async-renderer-";
import { isEmpty } from "lodash";

export function TodoTabs({
  todo,
  isLoading,
  error,
}: {
  todo: ITodo[];
  isLoading: boolean;
  error: Error | null;
}) {
  const { mutate } = useDeleteTodoPresenter();
  const removeTab = async (todo: ITodo) => {
    mutate({
      todoID: todo.todoID,
    });
  };

  return (
    <Tabs.List
      flex="1 1 auto"
      overflowX="auto"
      whiteSpace="nowrap"
      css={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <AsyncRenderer
        isLoading={isLoading}
        data={todo}
        hasData={true}
        error={error}
      >
        {(todo) =>
          todo.map((item) => (
            <Tabs.Trigger
              value={item.todoID.toString()}
              key={item.todoID}
              minW="auto"
            >
              {item.todoName}{" "}
              <CloseButton
                as="span"
                role="button"
                size="2xs"
                me="-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(item);
                }}
              />
            </Tabs.Trigger>
          ))
        }
      </AsyncRenderer>
      <AddTodoDialog />
    </Tabs.List>
  );
}

function AddTodoDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { register, handleSubmit, reset } = useForm<ICreateTodoRequest>({
    resolver: joiResolver(CreateTodoSchema),
  });
  const { mutate, data, isSuccess, isPending } = useCreateTodoPresenter();

  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  useEffect(() => {
    if (data) {
      closeDialog();
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      name: data.name,
    });
    reset();
  });

  return (
    <DialogRoot
      open={isOpenDialog}
      onEscapeKeyDown={closeDialog}
      onInteractOutside={closeDialog}
      onExitComplete={reset}
    >
      <DialogTrigger asChild>
        <Button
          alignSelf="center"
          ms="2"
          size="2xs"
          variant="ghost"
          colorPalette="teal"
          onClick={openDialog}
        >
          <LuPlus />
          Add Todo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <DialogBody>
            <Input
              {...register("name", { required: "Todo name is required" })}
            />
          </DialogBody>

          <DialogFooter>
            <Button type="submit" loading={isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>

        <DialogCloseTrigger onClick={closeDialog} />
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

const CreateTodoSchema = Joi.object<ICreateTodoRequest>({
  name: Joi.string().trim().required(),
});
