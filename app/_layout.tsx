import { Stack } from "expo-router";
import "react-native-reanimated";

import { SessionProvider } from "@/src/providers/session-provider";
import "../src/global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="worker/edit-profile"
          options={{ headerShown: false }}
        />
      </Stack>
    </SessionProvider>
  );
}
