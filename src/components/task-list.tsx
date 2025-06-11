import { Card, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  useDeleteTaskMutation,
  useTasksQuery,
} from "@/graphql/generated/graphql";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const TaskList = () => {
  const { data } = useTasksQuery();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  // Local state for optimistic tasks
  const [optimisticTasks, setOptimisticTasks] = useState(data?.tasks ?? []);

  // Sync with server data when it changes
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
                  <motion.div
                    className="flex items-center justify-between gap-1.5 py-8"
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  >
                    <Card.Root
                      css={{
                        listStyle: "none",
                        height: "100%",
                        flexGrow: 1,
                      }}
                      style={{
                        position: "relative",
                        borderRadius: "12px",
                        width: "100%", // layout resize animation
                        backgroundColor: "transparent",
                      }}
                    >
                      <motion.div
                        className="flex flex-row items-center p-4 gap-4 h-12 rounded-xl"
                        layout="position"
                      >
                        <Checkbox
                          variant="subtle"
                          colorPalette="cyan"
                          ml={4}
                          id={`checkbox-${item.id}`}
                          aria-label="Mark as done"
                          className="cursor-pointer"
                          onChange={() => completeItem(item.id)}
                        />
                        <Text>{item.title}</Text>
                      </motion.div>
                    </Card.Root>
                  </motion.div>
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
