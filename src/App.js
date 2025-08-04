import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";
import { TodosProvider } from "./contexts/TodosContext";
// OHTERS
import { v4 as uuidv4 } from "uuid";
import { ToastProvider } from "./contexts/ToastContext";
const initialTodos = [
  {
    id: uuidv4(),
    title: "task1",
    details: "Make it before the end of this month",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: `task2`,
    details: "Make it before the end of this month",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "task3",
    details: "24 hours for this task",
    isCompleted: false,
  },
];
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["cursive"],
      // fontFamily:["system-ui"],
    },
    palette: {
      primary: {
        main: "#dd2c00",
      },
    },
  });

  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#191b1f",
            }}
          >
            {" "}
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
