import { ClipboardList } from "lucide-react-native";
import { Text, View } from "react-native";

export function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center mt-16 px-6">
      <ClipboardList size={48} color="#A3A3A3" />

      <Text className="text-neutral-700 text-lg font-semibold mt-4">
        Nenhuma tarefa ainda
      </Text>

      <Text className="text-neutral-500 text-sm text-center mt-2">
        Adicione sua primeira tarefa para começar a organizar seu dia.
      </Text>
    </View>
  );
}