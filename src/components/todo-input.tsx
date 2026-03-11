import { useTodo } from "@/contexts/TodoContext";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export function TodoInput() {
  const [taskText, setTaskText] = useState('');

  const { addTask } = useTodo();
  

  async function handleAddTask(){
    if(!taskText.trim()) return;

    try {
      await addTask(taskText);
      setTaskText("");
    } catch(e) {
      console.log(e);
      Alert.alert("Erro", `${e}`);
    }
  }

  return (
    <View className="flex-row items-center mb-6 gap-2">
      <TextInput
        className="flex-1 bg-neutral-100 rounded-lg px-4 h-14 text-base text-neutral-900 border border-neutral-300"
        placeholder="Adicione uma nova tarefa"
        placeholderTextColor="#808080"
        value={taskText}
        onChangeText={setTaskText}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-green-700 flex-row px-4 h-14 rounded-lg items-center justify-center"
        onPress={handleAddTask}
      >
        <Text className="text-white font-bold">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}