import TaskDetails from "@/components/task-details";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import TaskList from "./components/task-list";

function App() {
  return (
    <Router>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
