"use client";

import { Flex, Separator, Tabs } from "@chakra-ui/react";
import { defaultTo, last } from "lodash";
import { useEffect, useState } from "react";
import { TodoContent } from "./todo-content";
import { TodoInput } from "./todo-input";
import { TodoTabs } from "./todo-tabs";
import { useTodoTabsPresenter } from "./useTodoPresenter";

function TodoDashboard() {
  const { data, isLoading, error } = useTodoTabsPresenter();
  const todo = defaultTo(data?.todo, []);
  const lastTodo = last(todo);
  const [selectedTab, setSelectedTab] = useState<string | null>(
    lastTodo?.todoID.toString() ?? null,
  );

  useEffect(() => {
    const lastTodo = last(todo);
    if (lastTodo) {
      setSelectedTab(lastTodo.todoID.toString());
    }
  }, [data]);

  return (
    <>
      <Flex
        height="full"
        direction="column"
        gapY={{
          base: "4",
          lgDown: "none",
        }}
      >
        <Tabs.Root
          value={selectedTab}
          onValueChange={(e) => setSelectedTab(e.value)}
        >
          <TodoTabs todo={todo} isLoading={isLoading} error={error} />
          <TodoContent todo={todo} />
        </Tabs.Root>
        {selectedTab && (
          <>
            <Separator />
            <TodoInput selectedTab={selectedTab} />
          </>
        )}
      </Flex>
    </>
  );
}

export default TodoDashboard;
