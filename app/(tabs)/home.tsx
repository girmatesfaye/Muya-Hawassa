import { Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ClientDashboard } from "@/src/components/home/client-dashboard";
import { WorkerDashboard } from "@/src/components/home/worker-dashboard";
import { useSession } from "@/src/providers/session-provider";

export default function HomeScreen() {
  const { user } = useSession();

  if (!user) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View className="flex-1 items-center justify-center bg-[#F4F7FC] px-6">
          <View className="w-full rounded-[28px] bg-white p-6">
            <Text className="text-[22px] font-extrabold text-[#0F172A]">
              You are not signed in
            </Text>
            <Text className="mt-3 text-base leading-7 text-[#475569]">
              Log in or create an account to see the correct dashboard for your
              role.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/auth/login")}
              className="mt-6 rounded-[20px] bg-[#1450D2] px-5 py-4"
            >
              <Text className="text-center text-lg font-bold text-white">
                Go To Login
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {user.role === "client" ? (
        <ClientDashboard userName={user.name} />
      ) : (
        <WorkerDashboard userName={user.name} />
      )}
    </>
  );
}
