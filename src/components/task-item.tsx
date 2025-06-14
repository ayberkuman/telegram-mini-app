import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

import TaskSwitch from "@/components/task-switch";
import AnimatedCheckbox from "@/components/ui/animated-checkbox";
import { type Task } from "@/graphql/generated/graphql";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type TaskItemProps = {
  task: Task;
  i: number;
  handleDeleteTask: (id: string) => void;
} & HTMLMotionProps<"div">;

export const TaskItem = React.memo(
  React.forwardRef<HTMLDivElement, TaskItemProps>(
    ({ task, handleDeleteTask, ...rest }, ref) => {
      const navigate = useNavigate();
      const { t } = useTranslation();
      const handleCheckboxChange = React.useCallback(
        (checked: boolean) => {
          if (checked) handleDeleteTask(task.id);
        },
        [handleDeleteTask, task.id]
      );
      return (
        <motion.div
          key={task.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          ref={ref}
          {...rest}
        >
          <Flex
            align="center"
            justify="space-between"
            px={2}
            py={4}
            borderRadius="md"
            borderWidth={1}
            borderColor="gray.200"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <AnimatedCheckbox
              id={`task-checkbox-${task.id}`}
              onChange={handleCheckboxChange}
            >
              <AnimatedCheckbox.Indicator
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
              <AnimatedCheckbox.Label
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Text fontSize="sm" sm={{ fontSize: "md" }}>
                  {task.title}
                </Text>
              </AnimatedCheckbox.Label>
            </AnimatedCheckbox>
            <Flex align="center" gap={2}>
              <Badge smDown={{ display: "none" }} size="sm" fontSize="xs">
                {t("pending")}
              </Badge>
              <TaskSwitch
                task={task}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
              <Badge smDown={{ display: "none" }} size="sm" fontSize="xs">
                {t("inProgress")}
              </Badge>
            </Flex>
          </Flex>
        </motion.div>
      );
    }
  )
);
