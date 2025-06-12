import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  return <div>TaskDetails {taskId}</div>;
}
