import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

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
  PhoneInput,
  SelectShell,
  TagSelector,
} from "@/src/components/shared/auth-form";
import { useSession } from "@/src/providers/session-provider";

const skills = [
  { label: "Plumbing", value: "Plumbing" },
  { label: "Electrical", value: "Electrical" },
  { label: "Cleaning", value: "Cleaning" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Painting", value: "Painting" },
] as const;

const levels = [
  { label: "Junior", value: "Junior" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
] as const;

export default function WorkerRegisterScreen() {
  const { signIn } = useSession();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkill, setSelectedSkill] =
    useState<(typeof skills)[number]["value"]>("Plumbing");
  const [selectedLevel, setSelectedLevel] =
    useState<(typeof levels)[number]["value"]>("Junior");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthScreen
        primaryLabel="Register & Verify"
        secondaryText="Already have an account?"
        secondaryActionLabel="Log In"
        onPrimaryPress={() => {
          signIn("worker", fullName);
          router.replace("/(tabs)/home");
        }}
        onSecondaryPress={() => router.push("/auth/login")}
      >
        <AuthTopBar title="Worker Registration" />

        <View className="px-6 pt-8">
          <AuthIntro
            eyebrow="Join The Network"
            title="Professional Profile Setup"
            description="Expand your reach in Hawassa by showcasing your expertise to thousands of clients."
          />

          <FormSection
            title="Account & Professional Profile"
            icon="account-outline"
          />

          <View className="gap-5">
            <FormField label="Full Name">
              <FormInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Abebe Bikila"
              />
            </FormField>

            <FormField label="Phone Number">
              <PhoneInput value={phone} onChangeText={setPhone} />
            </FormField>

            <FormField label="Email Address">
              <FormInput
                value={email}
                onChangeText={setEmail}
                placeholder="e.g. abebe@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Min. 8 characters"
                visible={showPassword}
                onToggleVisibility={() =>
                  setShowPassword((current) => !current)
                }
              />
            </FormField>

            <FormField label="Skill Category">
              <SelectShell value={selectedSkill} placeholder="Select your primary skill" />
              <TagSelector
                options={skills}
                selectedValue={selectedSkill}
                onChange={setSelectedSkill}
              />
            </FormField>

            <FormField label="Experience Level">
              <ChoiceChips
                options={levels}
                selectedValue={selectedLevel}
                onChange={setSelectedLevel}
              />
            </FormField>
          </View>

          <InfoCard>
            <Text className="text-base leading-7 text-[#334155]">
              By signing up, you agree to our{" "}
              <Text className="font-bold text-[#1450D2]">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="font-bold text-[#1450D2]">Privacy Policy</Text>.
              We will verify your identity to ensure platform safety.
            </Text>
          </InfoCard>
        </View>
      </AuthScreen>
    </>
  );
}
