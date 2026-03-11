import { Task } from "@/@types/database";
import { useSQLiteContext } from "expo-sqlite";

export function useTodoDatabase() {
  const database = useSQLiteContext();

  return {
    async createTask(task: string) {
      await database.runAsync(
        "INSERT INTO todos (task, completed) VALUES (?, 0)",
        task
      );
    },

    async getAllTasks() {
      return await database.getAllAsync<Task>(
        "SELECT * FROM todos ORDER BY id DESC"
      );
    },
  }
}