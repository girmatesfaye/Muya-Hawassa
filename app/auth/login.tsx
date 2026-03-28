import { Stack, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
  AuthIntro,
  AuthScreen,
  AuthTopBar,
  ChoiceChips,
  FormField,
  FormInput,
  FormSection,
  InfoCard,
  PasswordInput,
} from "@/src/components/shared/auth-form";
import { useSession } from "@/src/providers/session-provider";

const accountTypes = [
  { label: "Client", value: "Client" },
  { label: "Worker", value: "Worker" },
] as const;

export default function LoginScreen() {
  const { signIn } = useSession();
  const [accountType, setAccountType] =
    useState<(typeof accountTypes)[number]["value"]>("Client");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthScreen
        primaryLabel="Sign In"
        secondaryText="Don't have an account?"
        secondaryActionLabel="Sign Up"
        onPrimaryPress={() => {
          signIn(accountType.toLowerCase() as "client" | "worker");
          router.replace("/(tabs)/home");
        }}
        onSecondaryPress={() => router.push("/auth/signup")}
      >
        <AuthTopBar title="Welcome Back" />

        <View className="px-6 pt-8">
          <AuthIntro
            eyebrow="Access Your Account"
            title="Sign In To Continue"
            description="Log in to manage service requests, chat with verified workers, and track your activity across Muya."
          />

          <FormSection title="Account Access" icon="shield-account-outline" />

          <View className="gap-5">
            <FormField label="Account Type">
              <ChoiceChips
                options={accountTypes}
                selectedValue={accountType}
                onChange={setAccountType}
              />
            </FormField>

            <FormField label="Email Or Phone Number">
              <FormInput
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="Enter your email or phone"
                autoCapitalize="none"
              />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                visible={showPassword}
                onToggleVisibility={() =>
                  setShowPassword((current) => !current)
                }
              />
            </FormField>

            <Pressable
              accessibilityRole="button"
              className="self-end rounded-full bg-white px-4 py-2"
            >
              <Text className="text-sm font-semibold text-[#1450D2]">
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <InfoCard>
            <Text className="text-base leading-7 text-[#334155]">
              Sign in as a{" "}
              <Text className="font-bold text-[#1450D2]">client</Text> to post
              and manage service requests, or as a{" "}
              <Text className="font-bold text-[#1450D2]">worker</Text> to view
              jobs, update your profile, and respond quickly.
            </Text>
          </InfoCard>
        </View>
      </AuthScreen>
    </>
  );
}
