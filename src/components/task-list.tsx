import { LanguageSwitcher } from "@/components/language-switcher";
import SortAndFilter from "@/components/sort-and-filter";
import { TaskItem } from "@/components/task-item";
import { ColorModeButton } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/context/language-context";
import { useTasks } from "@/context/tasks-context";
import {
  Button,
  Container,
  Flex,
  Group,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TaskList() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  console.log(language);
  const { tasks, handleAddTask, handleDeleteTask } = useTasks();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState("");

  const onAddTask = async () => {
    if (newTask.trim()) {
      try {
        await handleAddTask(newTask);
        setNewTask("");
        setIsAddingTask(false);
      } catch (error) {
        console.error("Error adding task:", error);

        // Get the error message
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        toaster.create({
          title: "Error",
          description: `Failed to add task: ${errorMessage}`,
        });
      }
    }
  };

  return (
    <Container maxW="xl" margin="auto" padding="12">
      <Flex justify="space-between" align="center" w="full">
        <ColorModeButton />
        <TonConnectButton />
        <LanguageSwitcher />
      </Flex>
      <Flex
        direction="column"
        gap="4"
        border="1px solid"
        borderColor="gray.200"
        py={4}
        px={4}
      >
        <Flex justify="space-between" align="end">
          {isAddingTask ? (
            <Group attached w="full">
              <Input
                flex="1"
                placeholder="Enter your email"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <IconButton
                bg="bg.success"
                variant="plain"
                onClick={onAddTask}
                disabled={!newTask.trim()}
              >
                <Check className="text-gray-900" />
              </IconButton>
              <IconButton
                bg="bg.warning"
                variant="plain"
                onClick={() => setIsAddingTask(false)}
              >
                <X />
              </IconButton>
            </Group>
          ) : (
            <Button size="sm" onClick={() => setIsAddingTask(true)}>
              <Plus />
              <Text>{t("addTask")}</Text>
            </Button>
          )}

          <SortAndFilter />
        </Flex>
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
        </Flex>
      </Flex>
    </Container>
  );
}
