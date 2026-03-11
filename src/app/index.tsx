import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { TodoInput } from "@/components/todo-input";
import { useTodo } from "@/contexts/TodoContext";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { tasks } = useTodo();

  return (
    <SafeAreaView>
      <Header />

      <View className="p-4">
        <TodoInput />

        {tasks ? tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        )) : <Text>Sem tasks por enquanto</Text>}
      </View>
    </SafeAreaView>
  );
}
