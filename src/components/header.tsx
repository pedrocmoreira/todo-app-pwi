import { Text, View } from "react-native";

export function Header() {
  return (
    <View className={`flex-row justify-center items-center p-4  bg-neutral-200`}>
      <Text className="text-xl font-bold text-black">Lista Todo</Text>
    </View>
  )
}