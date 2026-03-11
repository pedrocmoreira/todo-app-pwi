import { Task } from "@/@types/database";
import { useTodoDatabase } from "@/database/todoDatabase";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface TodoContextData {
  tasks: Task[];
  loading: boolean;
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
    console.log('task from add', task)

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

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, loading, addTask, getTasks, toggleTask, deleteTask }}>
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