import { type HTMLMotionProps, motion } from "framer-motion";
import { Check } from "lucide-react";
import * as React from "react";

import TaskSwitch from "@/components/task-switch";
import { type Task } from "@/graphql/generated/graphql";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

type TaskItemProps = {
  task: Task;
  i: number;
  handleDeleteTask: (id: string) => void;
} & HTMLMotionProps<"div">;

export const TaskItem = React.forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task, handleDeleteTask, ...rest }, ref) => {
    return (
      <motion.div
        key={task.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        ref={ref}
        {...rest}
      >
        <Flex
          align="center"
          justify="space-between"
          px={4}
          py={1}
          borderRadius="md"
          bg="bg.muted"
          borderWidth={1}
          borderColor="gray.200"
        >
          <Text width="40%" fontSize="sm" pl={2}>
            {task.title}
          </Text>
          <Flex align="center" gap={2}>
            <Text fontSize="xs">Pending</Text>
            <TaskSwitch />
            <Text fontSize="xs">In Progress</Text>
          </Flex>
          <Tooltip openDelay={200} content="Done">
            <IconButton
              aria-label="Delete task"
              onClick={() => handleDeleteTask(task.id)}
              size="2xs"
              variant="subtle"
            >
              <Check className="text-green-400" />
            </IconButton>
          </Tooltip>
        </Flex>
      </motion.div>
    );
  }
);
