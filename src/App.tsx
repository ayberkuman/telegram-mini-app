import "./App.css";
import TaskList from "./components/task-list";
import { ColorModeButton } from "@/components/ui/color-mode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from "@/components/task-details";

function App() {
  return (
    <Router>
      <div className="container mx-auto min-h-screen">
        <ColorModeButton />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
