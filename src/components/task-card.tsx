import { Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  text: string;
  isCompleted?: boolean;
}

export function TaskCard({ text, isCompleted = false }: TaskItemProps) {
  return (
    <View className="flex-row items-center bg-[#f0f0f0] rounded-lg p-3 mb-2 border border-[#e0e0e0]">
      <TouchableOpacity
        className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
          isCompleted ? "bg-[#5e60ce] border-[#5e60ce]" : "border-[#1e6f9f]"
        }`}
      >
        {isCompleted && <Text className="text-white text-[10px] font-bold">✓</Text>}
      </TouchableOpacity>
      
      <Text
        className={`flex-1 text-sm leading-5 text-[#1a1a1a] ${
          isCompleted ? "line-through text-[#808080]" : ""
        }`}
        numberOfLines={2}
      >
        {text}
      </Text>

      <TouchableOpacity className="p-2">
        <Trash2 size={18} color="#808080" />
      </TouchableOpacity>
    </View>
  );
}