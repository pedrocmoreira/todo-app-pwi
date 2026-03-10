import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle='default'
      />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </SafeAreaProvider>
  );
}
