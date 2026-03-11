import { TodoProvider } from "@/contexts/TodoContext";
import { initializeTodoDatabase } from "@/database/initializeTodoDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="todo.db"
      onInit={initializeTodoDatabase}
    >
      <TodoProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle='default'
          />

          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </SafeAreaProvider>
      </TodoProvider>
    </SQLiteProvider>

  );
}
