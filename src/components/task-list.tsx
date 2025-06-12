import { Card, Flex } from "@chakra-ui/react";
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

export default TaskList;
