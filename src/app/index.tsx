import { EmptyState } from "@/components/empty-state";
import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { TodoInput } from "@/components/todo-input";
import { useTodo } from "@/contexts/TodoContext";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { filteredTasks } = useTodo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      <View className="flex-1 px-4 pt-4">
        <TodoInput />

        <Filter />

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TaskCard task={item} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<EmptyState />}
        />
      </View>
    </SafeAreaView>
  );
}