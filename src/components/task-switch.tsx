import { Switch } from "@/components/ui/animated-switch";
import { useTasks } from "@/context/tasks-context";
import type { Task } from "@/graphql/generated/graphql";

export default function TaskSwitch({ task }: { task: Task }) {
  const { handleStatusChange } = useTasks();

  const toggleSwitch = (checked: boolean) => {
    handleStatusChange(task.id, checked ? "IN_PROGRESS" : "PENDING");
  };

  return (
    <Switch
      id={`task-switch-${task.id}`}
      checked={task.status === "IN_PROGRESS"}
      setChecked={toggleSwitch}
    />
  );
}
