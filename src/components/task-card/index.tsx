import { Task } from "@/@types/database";
import { useTodo } from "@/contexts/TodoContext";
import { Check, Trash2 } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  task: Task;
}

export function TaskCard({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTodo();

  async function handleToggleTask() {
    try {
      await toggleTask(task);
    } catch (e) {
      Alert.alert("Erro", 'Erro ao atualizar a tarefa');
    }
  }

  async function handleDeleteTask() {
    try {
      await deleteTask(task.id);
      Alert.alert("Tarefa excluída", `A tarefa foi excluída com sucesso!`);
    } catch (e) {
      Alert.alert("Erro", 'Erro ao deletar a tarefa');
    }
  }

  return (
    <View className="flex-row items-center bg-neutral-100 rounded-lg p-3 mb-2 border border-neutral-300">
      <TouchableOpacity
        testID="toggle-task-button"
        className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${task.completed
          ? "bg-green-600 border-green-600"
          : "border-neutral-300"
          }`}
        onPress={handleToggleTask}
      >
        {task.completed ? <Check color="#FFFFFF" size={12} /> : null}
      </TouchableOpacity>

      <Text
        className={`flex-1 text-sm leading-5 text-neutral-800 ${task.completed ? "line-through text-neutral-500" : ""
          }`}
        numberOfLines={2}
      >
        {task.task}
      </Text>

      <TouchableOpacity testID="delete-task-button" activeOpacity={.7} onPress={handleDeleteTask} className="p-2" >
        <Trash2 size={18} color="#808080" />
      </TouchableOpacity>
    </View>
  );
}