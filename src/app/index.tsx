
import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { TodoInput } from "@/components/todo-input";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Header />

      <View className="p-4">
        <TodoInput />

        <TaskCard 
          text="Texto teste"
          isCompleted={false}

        />
      </View>
    </SafeAreaView>
  );
}
