import { type HTMLMotionProps, motion } from "framer-motion";
import { Trash } from "lucide-react";
import * as React from "react";

import { IconButton, Text, Flex } from "@chakra-ui/react";
import { type Task } from "@/graphql/generated/graphql";

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
          <Text fontSize="sm" pl={2}>
            {task.title}
          </Text>
          <IconButton
            aria-label="Delete task"
            onClick={() => handleDeleteTask(task.id)}
            size="2xs"
          >
            <Trash className="text-red-400" />
          </IconButton>
        </Flex>
      </motion.div>
    );
  }
);
