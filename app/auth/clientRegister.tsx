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
} from "@/src/components/shared/auth-form";
import { useSession } from "@/src/providers/session-provider";

const serviceAreas = [
  { label: "Tabor", value: "Tabor" },
  { label: "Piassa", value: "Piassa" },
  { label: "Menaharia", value: "Menaharia" },
] as const;

export default function ClientRegisterScreen() {
  const { signIn } = useSession();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedArea, setSelectedArea] =
    useState<(typeof serviceAreas)[number]["value"]>("Tabor");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthScreen
        primaryLabel="Create My Account"
        secondaryText="Already have an account?"
        secondaryActionLabel="Log In"
        onPrimaryPress={() => {
          signIn("client", fullName);
          router.replace("/(tabs)/home");
        }}
        onSecondaryPress={() => router.push("/auth/login")}
      >
        <AuthTopBar title="Client Registration" />

        <View className="px-6 pt-8">
          <AuthIntro
            eyebrow="Get Started"
            title="Create Your Client Account"
            description="Join Muya to request trusted services in Hawassa, manage jobs easily, and connect with verified local workers."
          />

          <FormSection title="Personal Information" icon="account-outline" />

          <View className="gap-5">
            <FormField label="Full Name">
              <FormInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Hana Tesfaye"
              />
            </FormField>

            <FormField label="Phone Number">
              <PhoneInput value={phone} onChangeText={setPhone} />
            </FormField>

            <FormField label="Email Address">
              <FormInput
                value={email}
                onChangeText={setEmail}
                placeholder="e.g. hana@example.com"
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

            <FormField label="Preferred Service Area">
              <SelectShell value={selectedArea} placeholder="Select your area" />
              <ChoiceChips
                options={serviceAreas}
                selectedValue={selectedArea}
                onChange={setSelectedArea}
              />
            </FormField>
          </View>

          <InfoCard>
            <Text className="text-base leading-7 text-[#334155]">
              By creating an account, you agree to our{" "}
              <Text className="font-bold text-[#1450D2]">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="font-bold text-[#1450D2]">Privacy Policy</Text>.
              Your details help us match you with nearby trusted workers.
            </Text>
          </InfoCard>
        </View>
      </AuthScreen>
    </>
  );
}
