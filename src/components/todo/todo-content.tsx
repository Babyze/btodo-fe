"use client";
import { AsyncRenderer } from "@/components/ui/async-renderer-";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { ITask } from "@/models/task/task.model";
import { ITodo } from "@/models/todo/todo.model";
import { TASK_STATUS } from "@/utils/constants/task.constant";
import { IconButton, Stack, Tabs } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { LuTrash } from "react-icons/lu";
import {
  useDeleteTaskPresenter,
  useTodoContentPresenter,
  useUpdateTaskPresenter,
} from "./useTodoPresenter";

export function TodoContent({ todo }: { todo: ITodo[] }) {
  return (
    <Tabs.ContentGroup
      overflowY="scroll"
      css={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      h="xl"
      maxH={{
        mdDown: "md",
      }}
    >
      {todo.map((todoItem) => (
        <Tabs.Content value={todoItem.todoID.toString()} key={todoItem.todoID}>
          <Stack gap="5">
            <TaskList todoItem={todoItem} />
          </Stack>
        </Tabs.Content>
      ))}
    </Tabs.ContentGroup>
  );
}

function TaskList({ todoItem }: { todoItem: ITodo }) {
  const { data, isLoading, error } = useTodoContentPresenter({
    todoID: todoItem.todoID,
  });

  return (
    <AsyncRenderer
      data={data?.tasks ?? []}
      error={error}
      hasData={!isEmpty(data?.tasks)}
      isLoading={isLoading}
    >
      {(tasks) =>
        tasks.map((task) => (
          <Task task={task} todoItem={todoItem} key={task.taskID} />
        ))
      }
    </AsyncRenderer>
  );
}

function Task({ task, todoItem }: { task: ITask; todoItem: ITodo }) {
  const [checked, setChecked] = useState<boolean>(
    task.status === TASK_STATUS.DONE,
  );
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteTaskPresenter(todoItem.todoID);
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateTaskPresenter(todoItem.todoID);

  useEffect(() => {
    setChecked(task.status === TASK_STATUS.DONE);
  }, [task]);

  function onClick() {
    deleteMutate({
      todoID: todoItem.todoID,
      taskID: task.taskID,
    });
  }

  function onCheckedChange() {
    updateMutate({
      todoID: todoItem.todoID,
      taskID: task.taskID,
      status: !checked ? TASK_STATUS.DONE : TASK_STATUS.CREATE,
    });
    setChecked(!checked);
  }

  return (
    <Stack direction="row" h="20">
      <IconButton
        color="gray.700"
        variant="ghost"
        _hover={{
          color: "red.600",
          borderColor: "red.600",
        }}
        height="full"
        onClick={onClick}
        disabled={isDeletePending}
      >
        <LuTrash />
      </IconButton>

      <CheckboxCard
        size="md"
        checked={checked}
        variant="outline"
        p="2"
        width="full"
        _hover={{
          borderWidth: "thin",
          borderColor: "teal",
        }}
        onCheckedChange={onCheckedChange}
        colorPalette="teal"
        css={
          checked && {
            textDecoration: "line-through",
            color: "teal",
          }
        }
        label={task.taskName}
        disabled={isUpdatePending}
      />
    </Stack>
  );
}
