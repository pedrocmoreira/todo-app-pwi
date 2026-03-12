import { Task } from "@/@types/database";
import { Status } from "@/@types/status";
import { useTodoDatabase } from "@/database/todoDatabase";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface TodoContextData {
  tasks: Task[];
  loading: boolean;
  filteredTasks: Task[];
  filter: Status;
  setFilter: (status: Status) => void;
  addTask: (task: string) => Promise<void>;
  getTasks: () => Promise<void>;
  toggleTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

export function TodoProvider({ children }: TodoProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status>("all");
  const [loading, setLoading] = useState(false);

  const todoDB = useTodoDatabase();

  async function getTasks() {
    setLoading(true);

    try {
      const response = await todoDB.getAllTasks();
      setTasks(response);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(task: string) {
    await todoDB.createTask(task);
    await getTasks();
  }

  async function toggleTask(task: Task) {
    const newStatus = task.completed ? 0 : 1;

    await todoDB.updateTaskStatus(task.id, newStatus);
    getTasks();
  }

  async function deleteTask(id: number) {
    await todoDB.deleteTask(id);
    getTasks()
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "pending") return task.completed === 0;
      if (filter === "done") return task.completed === 1;
      return true;
    });
  }, [tasks, filter]);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, loading, addTask, getTasks, toggleTask, deleteTask, filter, filteredTasks, setFilter }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }

  return context;
}