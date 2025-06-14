import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useTaskAddedSubscription,
  useTaskDeletedSubscription,
  useTasksQueryQuery,
  useTaskUpdatedSubscription,
  useUpdateTaskMutation,
  type Task,
  type TasksQueryQuery,
  TasksQueryDocument,
} from "@/graphql/generated/graphql";
import { sortByVar, statusVar, type TaskStatus } from "@/graphql/reactiveVars";
import { ApolloError, useApolloClient, useReactiveVar } from "@apollo/client";
import React, { createContext, useContext, useEffect } from "react";

interface TasksContextType {
  tasks: Task[];
  totalCount: number;
  hasMore: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  handleAddTask: (title: string) => Promise<void>;
  handleStatusChange: (id: string, status: TaskStatus) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;

  status: string | undefined;
  sortBy: string | undefined;
  setStatus: (status: TaskStatus | undefined) => void;
  setSortBy: (sortBy: string | undefined) => void;
  addTaskLoading: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const status = useReactiveVar(statusVar);
  const sortBy = useReactiveVar(sortByVar);

  const client = useApolloClient();

  const { data, loading, error } = useTasksQueryQuery({
    variables: { status, sortBy },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const [addTask, { loading: addTaskLoading }] = useAddTaskMutation({
    optimisticResponse: (variables) => ({
      addTask: {
        __typename: "Task",
        id: `temp-${Date.now()}-${Math.random()}`,
        title: variables.title,
        status: "PENDING" as TaskStatus,
      },
    }),
  });

  const [updateTask] = useUpdateTaskMutation({
    optimisticResponse: (variables) => ({
      updateTask: {
        __typename: "Task",
        id: variables.id,
        title: "",
        status: variables.status as TaskStatus,
      },
    }),
    update: (cache, { data }) => {
      if (data?.updateTask) {
        cache.modify({
          id: cache.identify(data.updateTask),
          fields: {
            status() {
              return data.updateTask.status as TaskStatus;
            },
          },
        });
      }
    },
  });

  const [deleteTask] = useDeleteTaskMutation({
    optimisticResponse: (variables) => ({
      deleteTask: variables.id,
    }),
    update: (cache, { data }) => {
      if (data?.deleteTask) {
        const existingData = cache.readQuery<TasksQueryQuery>({
          query: TasksQueryDocument,
          variables: { status, sortBy },
        });

        if (existingData?.tasks.tasks) {
          cache.writeQuery({
            query: TasksQueryDocument,
            variables: { status, sortBy },
            data: {
              tasks: {
                ...existingData.tasks,
                tasks: existingData.tasks.tasks.filter(
                  (task) => task.id !== data.deleteTask
                ),
              },
            },
          });
        }
      }
    },
  });

  const setStatus = (newStatus: TaskStatus | undefined) => statusVar(newStatus);
  const setSortBy = (newSort: string | undefined) => sortByVar(newSort);

  const { data: taskAdded } = useTaskAddedSubscription();
  const { data: taskUpdated } = useTaskUpdatedSubscription();
  const { data: taskDeleted } = useTaskDeletedSubscription();

  useEffect(() => {}, [taskUpdated]);

  useEffect(() => {
    if (taskAdded?.taskAdded) {
      const existingData = client.readQuery<TasksQueryQuery>({
        query: TasksQueryDocument,
        variables: { status, sortBy },
      });

      if (existingData?.tasks.tasks) {
        // Only add if task doesn't already exist (prevents duplicates)
        const taskExists = existingData.tasks.tasks.some(
          (task) => task.id === taskAdded.taskAdded.id
        );

        if (!taskExists) {
          client.writeQuery({
            query: TasksQueryDocument,
            variables: { status, sortBy },
            data: {
              tasks: {
                ...existingData.tasks,
                tasks: [taskAdded.taskAdded, ...existingData.tasks.tasks],
                totalCount: existingData.tasks.totalCount + 1,
              },
            },
          });
        }
      }
    }
  }, [taskAdded, client, status, sortBy]);

  useEffect(() => {
    if (taskDeleted?.taskDeleted) {
      client.cache.evict({
        id: client.cache.identify({
          __typename: "Task",
          id: taskDeleted.taskDeleted,
        }),
      });
      client.cache.gc();
    }
  }, [taskDeleted, client]);

  const handleAddTask = async (title: string) => {
    try {
      console.log("Adding task:", title);
      const result = await addTask({
        variables: { title },
      });

      // Check for GraphQL errors
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }
    } catch (err) {
      console.error("Error adding task:", err);
      throw err; // Re-throw so the component can catch it
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const result = await updateTask({
        variables: { id, status },
      });

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }
    } catch (err) {
      console.error("Error details:", {
        message: (err as Error).message,
        graphQLErrors: (err as ApolloError).graphQLErrors,
        networkError: (err as ApolloError).networkError,
      });
      throw err;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const result = await deleteTask({
        variables: { id },
      });

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: data?.tasks.tasks || [],
        totalCount: data?.tasks.totalCount || 0,
        hasMore: data?.tasks.hasMore || false,
        loading,
        error,
        handleAddTask,
        handleStatusChange,
        handleDeleteTask,
        status,
        sortBy,
        setStatus,
        setSortBy,
        addTaskLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
