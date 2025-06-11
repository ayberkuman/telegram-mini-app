import "./App.css";
import TaskList from "./components/task-list";
import { ColorModeButton } from "@/components/ui/color-mode";

function App() {
  return (
    <div className="container mx-auto min-h-screen">
      <ColorModeButton />
      <TaskList />
    </div>
  );
}

export default App;
