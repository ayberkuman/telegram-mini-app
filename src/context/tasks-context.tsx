import React, { createContext, useContext } from "react";
import {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  type TasksQueryVariables,
  type Task,
} from "@/graphql/generated/graphql";

interface TasksContextType {
  tasks: Task[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: (variables?: TasksQueryVariables) => void;
  addTask: (title: string) => void;
  updateTask: (id: string, status: string) => void;
  deleteTask: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error, refetch } = useTasksQuery();
  const [addTaskMutation] = useAddTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const addTask = (title: string) => {
    addTaskMutation({ variables: { title } });
  };

  const updateTask = (id: string, status: string) => {
    updateTaskMutation({ variables: { id, status } });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation({ variables: { id } });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: data?.tasks,
        loading,
        error: error as Error | undefined,
        refetch,
        addTask,
        updateTask,
        deleteTask,
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
