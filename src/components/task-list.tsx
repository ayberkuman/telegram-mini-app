import { TaskItem } from "@/components/task-item";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useTasks } from "@/context/tasks-context";
import { Button, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Plus, Trash } from "lucide-react";

export default function TaskList() {
  const {
    tasks,
    hasMore,
    loading,
    error,
    handleAddTask,
    handleStatusChange,
    handleDeleteTask,
    sentinelRef,
  } = useTasks();

  return (
    <Container maxW="lg" margin="auto" padding="12">
      <Flex>
        <ColorModeButton />
      </Flex>
      <Flex direction="column" gap="4">
        {/* Add Task button (implement add logic as needed) */}
        <Button size="sm">
          <Plus />
          <Text>Add Task</Text>
        </Button>
        <Flex direction="column" gap="3">
          <AnimatePresence initial={false}>
            {tasks.map((task, i) => (
              <TaskItem
                key={task.id}
                task={task}
                i={i}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </Flex>
        <Flex pt={4} align="center" justify="space-between">
          <Text color="gray.500" fontSize="sm">
            Total tasks: {tasks.length}
          </Text>
          <IconButton variant="solid" size="sm" aria-label="Delete all">
            <Trash />
            Delete all
          </IconButton>
        </Flex>
      </Flex>
    </Container>
  );
}
