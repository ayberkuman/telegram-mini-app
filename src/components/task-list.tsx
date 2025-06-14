import { LanguageSwitcher } from "@/components/language-switcher";
import SortAndFilter from "@/components/sort-and-filter";
import { TaskItem } from "@/components/task-item";
import { ColorModeButton } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useTasks } from "@/context/tasks-context";
import {
  Button,
  Container,
  Flex,
  Group,
  IconButton,
  Input,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TaskList() {
  const { t } = useTranslation();
  /*  const userAddress = useTonAddress(); */
  const { tasks, handleAddTask, handleDeleteTask, loading, addTaskLoading } =
    useTasks();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState("");

  const onAddTask = useCallback(async () => {
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
  }, [newTask, handleAddTask]);

  const taskItems = useMemo(
    () =>
      tasks.map((task, i) => (
        <TaskItem
          key={task.id}
          task={task}
          i={i}
          handleDeleteTask={handleDeleteTask}
        />
      )),
    [tasks, handleDeleteTask]
  );

  return (
    <Container maxW="xl" margin="auto" padding="12">
      <Flex justify="space-between" align="center" w="full">
        <ColorModeButton />
        {/*  {userAddress ? (
          <Badge variant="plain">{userAddress}</Badge>
        ) : (
          <TonConnectButton />
        )} */}
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
          <SortAndFilter />
        </Flex>
        <Flex direction="column" gap="3" maxH="400px" overflowY="auto">
          <AnimatePresence initial={false}>
            {loading ? (
              <Center h={300}>
                <Spinner />
              </Center>
            ) : (
              taskItems
            )}
          </AnimatePresence>
        </Flex>
        <Flex pt={4} align="center" justify="space-between">
          {isAddingTask ? (
            <Group attached w="full">
              <Input
                flex="1"
                placeholder={t("addTask")}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <IconButton
                bg="bg.success"
                variant="plain"
                onClick={onAddTask}
                disabled={!newTask.trim() || addTaskLoading}
              >
                {addTaskLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Check className="text-gray-900" />
                )}
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
        </Flex>
      </Flex>
    </Container>
  );
}
