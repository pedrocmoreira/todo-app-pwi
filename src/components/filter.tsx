import { Status } from "@/@types/status";
import { useTodo } from "@/contexts/TodoContext";
import { Text, TouchableOpacity, View } from "react-native";

const filters: {
  id: Status;
  label: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}[] = [
    {
      id: "all",
      label: "Todas",
      activeBg: "bg-blue-100",
      activeBorder: "border-blue-400",
      activeText: "text-blue-600",
    },
    {
      id: "pending",
      label: "Pendentes",
      activeBg: "bg-amber-100",
      activeBorder: "border-amber-400",
      activeText: "text-amber-600",
    },
    {
      id: "done",
      label: "Concluídas",
      activeBg: "bg-green-100",
      activeBorder: "border-green-400",
      activeText: "text-green-600",
    },
  ];

export function Filter() {
  const { filter, setFilter } = useTodo();

  return (
    <View className="mb-4 flex-row justify-center items-center gap-2">
        {filters.map((item) => {
          const isActive = filter === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setFilter(item.id)}
              activeOpacity={0.7}
              className={`px-6 py-3 rounded-full border ${isActive
                  ? `${item.activeBg} ${item.activeBorder}`
                  : "bg-neutral-100 border-neutral-300"
                }`}
            >
              <Text
                className={`font-semibold ${isActive ? item.activeText : "text-neutral-600"
                  }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}