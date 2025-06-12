/* import { Card, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import TaskItem from "@/components/task-item";
import {
  useDeleteTaskMutation,
  useTasksQuery,
} from "@/graphql/generated/graphql";
import { AnimatePresence, LayoutGroup } from "framer-motion";

const TaskList = () => {
  const { data } = useTasksQuery();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const [optimisticTasks, setOptimisticTasks] = useState(data?.tasks ?? []);

  useEffect(() => {
    setOptimisticTasks(data?.tasks ?? []);
  }, [data?.tasks]);

  const completeItem = (id: string) => {
    setOptimisticTasks((tasks) => tasks?.filter((task) => task.id !== id));
    deleteTaskMutation({ variables: { id } });
  };

  return (
    <Card.Root width="sm" mx="auto">
      <Card.Body>
        <Flex direction="column" gap="4" alignItems="start">
          <LayoutGroup>
            <div className="flex flex-col gap-3 w-full">
              <AnimatePresence>
                {optimisticTasks?.map((item) => (
                  <TaskItem
                    key={item.id}
                    item={item}
                    completeItem={completeItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
 */

import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import * as React from "react";

import { Button, Container, Flex, IconButton, Text } from "@chakra-ui/react";

import { TaskItem } from "@/components/task-item";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Plus, Trash } from "lucide-react";

export default function TaskList() {
  const [countList, setCountList] = React.useState([1, 2, 3, 4, 5]);
  const color = useColorModeValue("black", "white");
  console.log(color);
  return (
    <Container maxW="lg" margin="auto" padding="12">
      <Flex>
        <ColorModeButton />
      </Flex>
      <Flex direction="column" gap="4">
        <Button
          size="sm"
          onClick={() =>
            setCountList((prev) => [...prev, (prev[prev.length - 1] ?? 0) + 1])
          }
        >
          <Plus />
          <Text>Add Item</Text>
        </Button>
        <Flex direction="column" gap="3">
          <AnimatePresence initial={false}>
            {countList.map((count, i) => (
              <TaskItem
                key={count}
                i={i}
                count={count}
                countList={countList}
                setCountList={setCountList}
              />
            ))}
          </AnimatePresence>
        </Flex>
        <div
          className={clsx([
            "pt-4 bg-neutral-50 flex items-center justify-between",
          ])}
        >
          <p className="text-neutral-500 text-sm">
            Total count: {countList.length}
          </p>

          <IconButton
            className="justify-center"
            variant="solid"
            size="sm"
            onClick={() => setCountList([])}
          >
            <Trash />
            Delete all
          </IconButton>
        </div>
      </Flex>
    </Container>
  );
}
