import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
  AuthIntro,
  AuthScreen,
  AuthTopBar,
  InfoCard,
} from "@/src/components/shared/auth-form";

const accountOptions = [
  {
    title: "I'm a Client",
    description: "Post jobs, compare workers, and manage service requests.",
    icon: "briefcase-outline" as const,
    route: "/auth/clientRegister" as const,
  },
  {
    title: "I'm a Worker",
    description: "Create your profile, get discovered, and receive job leads.",
    icon: "hammer-wrench" as const,
    route: "/auth/workerRegister" as const,
  },
] as const;

export default function SignupScreen() {
  const [selectedRoute, setSelectedRoute] =
    useState<(typeof accountOptions)[number]["route"]>("/auth/clientRegister");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthScreen
        primaryLabel="Continue"
        secondaryText="Already have an account?"
        secondaryActionLabel="Log In"
        onPrimaryPress={() => router.push(selectedRoute)}
        onSecondaryPress={() => router.push("/auth/login")}
      >
        <AuthTopBar title="Create Account" />

        <View className="px-6 pt-8">
          <AuthIntro
            eyebrow="Join Muya"
            title="Choose How You Want To Use Muya"
            description="Start as a client to request trusted help, or as a worker to showcase your skills and grow your business."
          />

          <View className="gap-4">
            {accountOptions.map((option) => {
              const active = selectedRoute === option.route;

              return (
                <Pressable
                  key={option.route}
                  accessibilityRole="button"
                  onPress={() => setSelectedRoute(option.route)}
                  className={`rounded-[28px] border bg-white p-5 ${
                    active
                      ? "border-[#1450D2] bg-[#F7FAFF]"
                      : "border-[#E1E7F0]"
                  }`}
                >
                  <View className="flex-row items-start gap-4">
                    <View
                      className={`h-12 w-12 items-center justify-center rounded-2xl ${
                        active ? "bg-[#1450D2]" : "bg-[#EEF4FF]"
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={option.icon}
                        size={22}
                        color={active ? "#FFFFFF" : "#1450D2"}
                      />
                    </View>

                    <View className="flex-1">
                      <View className="mb-2 flex-row items-center justify-between gap-3">
                        <Text
                          className={`text-lg font-extrabold ${
                            active ? "text-[#1450D2]" : "text-[#0F172A]"
                          }`}
                        >
                          {option.title}
                        </Text>
                        <View
                          className={`h-6 w-6 items-center justify-center rounded-full border ${
                            active
                              ? "border-[#1450D2] bg-[#1450D2]"
                              : "border-[#CBD5E1] bg-white"
                          }`}
                        >
                          {active ? (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color="#FFFFFF"
                            />
                          ) : null}
                        </View>
                      </View>

                      <Text className="text-sm leading-6 text-[#4B5563]">
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <InfoCard>
            <Text className="text-base leading-7 text-[#334155]">
              You can continue with the option that fits your role today. If
              you are hiring, choose{" "}
              <Text className="font-bold text-[#1450D2]">client</Text>. If you
              want to offer services, choose{" "}
              <Text className="font-bold text-[#1450D2]">worker</Text>.
            </Text>
          </InfoCard>
        </View>
      </AuthScreen>
    </>
  );
}
