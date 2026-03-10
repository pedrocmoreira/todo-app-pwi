import { Text, TextInput, TouchableOpacity, View } from "react-native";

export function TodoInput() {
  return (
    <View className="flex-row items-center mb-6 gap-2">
      <TextInput
        className="flex-1 bg-neutral-100 rounded-lg px-4 h-14 text-base text-neutral-900 border border-neutral-300"
        placeholder="O que vamos fazer hoje?"
        placeholderTextColor="#808080"
      />
      
      <TouchableOpacity 
        activeOpacity={0.7} 
        className="bg-green-700 flex-row px-4 h-14 rounded-lg items-center justify-center"
      >
        <Text className="text-white font-bold">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}