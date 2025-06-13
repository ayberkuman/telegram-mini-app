import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "@/context/tasks-context";
import { Box, Flex, Badge, Button, Heading, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <Flex direction="column" align="center" justify="center" minH="60vh">
        <Text fontSize="xl" color="red.500">
          Task not found
        </Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          <ArrowLeft style={{ marginRight: 8 }} /> Back
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" minH="60vh">
      <Box
        borderWidth={1}
        borderRadius="md"
        p={8}
        minW="320px"
        boxShadow="md"
        bg="white"
        _dark={{ bg: "gray.800" }}
      >
        <Heading size="md" mb={4}>
          {task.title}
        </Heading>
        <Badge
          colorScheme={
            task.status === "DONE"
              ? "green"
              : task.status === "IN_PROGRESS"
              ? "yellow"
              : "gray"
          }
          fontSize="md"
          mb={4}
        >
          {task.status}
        </Badge>
        <Flex mt={8} justify="flex-end">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft style={{ marginRight: 8 }} /> Back
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
