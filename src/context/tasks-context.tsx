import React, { createContext, useContext } from "react";
import {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  type TasksQueryVariables,
  type Task,
} from "@/graphql/generated/graphql";
import { statusVar, sortByVar, type TaskStatus } from "@/graphql/reactiveVars";
import { useReactiveVar } from "@apollo/client";

interface TasksContextType {
  tasks: Task[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: (variables?: TasksQueryVariables) => void;
  addTask: (title: string) => void;
  updateTask: (id: string, status: string) => void;
  deleteTask: (id: string) => void;
  status: string | undefined;
  sortBy: string | undefined;
  setStatus: (status: TaskStatus | undefined) => void;
  setSortBy: (sortBy: string | undefined) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const status = useReactiveVar(statusVar);
  const sortBy = useReactiveVar(sortByVar);

  const { data, loading, error, refetch } = useTasksQuery({
    variables: { status, sortBy },
  });
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

  const setStatus = (newStatus: TaskStatus | undefined) => statusVar(newStatus);
  const setSortBy = (newSort: string | undefined) => sortByVar(newSort);

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
        status,
        sortBy,
        setStatus,
        setSortBy,
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
