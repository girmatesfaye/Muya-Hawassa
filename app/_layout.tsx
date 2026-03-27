import { Stack } from "expo-router";
import "../src/global.css";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="index" />
  </Stack>
}
