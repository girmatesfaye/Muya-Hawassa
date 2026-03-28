import { Stack } from "expo-router";
import "react-native-reanimated";
import "../src/global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
    </Stack>
  );
}
