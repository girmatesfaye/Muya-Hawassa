import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function WorkerEditProfileScreen() {
  const params = useLocalSearchParams<{
    name?: string;
    skills?: string;
    experience?: string;
    serviceArea?: string;
  }>();

  const defaults = useMemo(
    () => ({
      name: toSingle(params.name) || "Abebe Kebede",
      skills: toSingle(params.skills) || "Plumbing, Pipe Repair",
      experience: toSingle(params.experience) || "5 years (Senior)",
      serviceArea: toSingle(params.serviceArea) || "Tabor, Hawassa",
    }),
    [params.experience, params.name, params.serviceArea, params.skills],
  );

  const [name, setName] = useState(defaults.name);
  const [skills, setSkills] = useState(
    defaults.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
  );
  const [experience, setExperience] = useState(defaults.experience);
  const [serviceArea, setServiceArea] = useState(defaults.serviceArea);
  const [phone, setPhone] = useState("+251  911 234 567");
  const [telegram, setTelegram] = useState("@abebekebede");
  const [tiktok, setTiktok] = useState("https://tiktok.com/@abebe_works");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-[#EDEEF4]"
        contentContainerStyle={{ paddingBottom: 32, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-[#DDE2EE] bg-white px-4 pb-4 pt-3">
          <View className="flex-row items-center justify-between">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <Ionicons name="arrow-back" size={22} color="#1E3A8A" />
            </Pressable>

            <Text className="text-[28px] font-bold text-[#0F172A]">
              Edit Profile
            </Text>

            <Pressable accessibilityRole="button" onPress={() => router.back()}>
              <Text className="text-[22px] font-semibold text-[#1450D2]">
                Save
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="items-center px-5 pt-2">
          <View className="relative">
            <Image
              source="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=60"
              contentFit="cover"
              className="h-[132px] w-[132px] rounded-full border-4 border-[#A8C5DC]"
            />

            <Pressable className="absolute bottom-1 right-1 h-11 w-11 items-center justify-center rounded-full bg-[#1450D2]">
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text className="mt-4 text-[30px] uppercase tracking-[1px] text-[#111827]">
            WORKER ACCOUNT ·{" "}
            <Text className="font-semibold text-[#15803D]">VERIFIED</Text>
          </Text>
        </View>

        <View className="px-5">
          <SectionHeader title="Personal Information" step="STEP 01" />
          <LabeledInput label="Full Name" value={name} onChangeText={setName} />

          <Divider />

          <SectionHeader title="Professional Details" step="STEP 02" />

          <Text className="mb-2 text-[21px] font-medium text-[#111827]">
            Specific Skills
          </Text>
          <View className="mb-5 rounded-[16px] bg-[#E9EBF1] p-3">
            <View className="flex-row flex-wrap gap-2">
              {skills.map((skill) => (
                <Pressable
                  key={skill}
                  onPress={() =>
                    setSkills((current) =>
                      current.filter((item) => item !== skill),
                    )
                  }
                  className="min-h-[42px] flex-row items-center gap-2 rounded-full bg-[#1450D2] px-5"
                >
                  <Text className="text-[21px] font-medium text-white">
                    {skill}
                  </Text>
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </Pressable>
              ))}

              <View className="min-h-[42px] flex-row items-center rounded-full bg-[#D6DDEA] px-5">
                <Text className="text-[21px] font-medium text-[#1F2937]">
                  Add Skill
                </Text>
                <Text className="ml-2 text-[20px] text-[#6B7280]">+</Text>
              </View>
            </View>
          </View>

          <LabeledInput
            label="Experience Level"
            value={experience}
            onChangeText={setExperience}
            rightIcon="chevron-down"
          />

          <Text className="mb-2 text-[21px] font-medium text-[#111827]">
            Service Area ({serviceArea})
          </Text>
          <View className="mb-5 overflow-hidden rounded-[16px] bg-[#79D4E5]">
            <View className="h-[180px] items-center justify-center">
              <View className="h-[110px] w-[110px] items-center justify-center rounded-full border-2 border-[#2E67D3] bg-[#4AA5D7]/25">
                <Ionicons name="location" size={30} color="#1450D2" />
              </View>

              <Pressable className="absolute bottom-3 right-3 h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Ionicons name="locate-outline" size={18} color="#0F172A" />
              </Pressable>
            </View>
          </View>

          <Divider />

          <SectionHeader title="Contact Links" step="STEP 03" />
          <LabeledInput
            label="Phone Number (Call)"
            value={phone}
            onChangeText={setPhone}
          />
          <LabeledInput
            label="Telegram Username"
            value={telegram}
            onChangeText={setTelegram}
          />
          <LabeledInput
            label="TikTok Profile Link"
            value={tiktok}
            onChangeText={setTiktok}
            leftIcon="musical-note"
          />

          <Divider />

          <View className="mb-3 mt-2 flex-row items-center justify-between">
            <Text className="text-[34px] font-semibold text-[#111827]">
              Portfolio
            </Text>
            <Pressable className="flex-row items-center gap-1">
              <Ionicons name="add-circle" size={17} color="#1450D2" />
              <Text className="text-[24px] font-semibold text-[#1450D2]">
                Add Project
              </Text>
            </Pressable>
          </View>

          <View className="flex-row gap-3 pb-2">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="h-[92px] flex-1 overflow-hidden rounded-[18px] bg-[#D5D9E3]"
              >
                <Image
                  source={
                    item === 1
                      ? "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=300&q=60"
                      : item === 2
                        ? "https://images.unsplash.com/photo-1581147036324-c47a03a81d48?auto=format&fit=crop&w=300&q=60"
                        : "https://images.unsplash.com/photo-1584622781862-beb2f2f6f6f4?auto=format&fit=crop&w=300&q=60"
                  }
                  contentFit="cover"
                  className="h-full w-full"
                />

                <Pressable className="absolute right-1 top-1 h-6 w-6 items-center justify-center rounded-full bg-[#D32F2F]">
                  <Ionicons name="close" size={14} color="#FFFFFF" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function SectionHeader({ title, step }: { title: string; step: string }) {
  return (
    <View className="mb-3 mt-2 flex-row items-end justify-between">
      <Text className="text-[31px] font-semibold text-[#111827]">{title}</Text>
      <Text className="pb-1 text-[16px] tracking-[1.2px] text-[#1450D2]">
        {step}
      </Text>
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  leftIcon,
  rightIcon,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View className="mb-5 gap-2">
      <Text className="text-[21px] font-medium text-[#111827]">{label}</Text>
      <View className="min-h-[58px] flex-row items-center rounded-[14px] bg-[#F9FAFB] px-4">
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={18}
            color="#111827"
            style={{ marginRight: 10 }}
          />
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="flex-1 text-[25px] text-[#111827]"
          placeholderTextColor="#9CA3AF"
        />
        {rightIcon ? (
          <Ionicons name={rightIcon} size={18} color="#0F172A" />
        ) : null}
      </View>
    </View>
  );
}

function Divider() {
  return <View className="my-4 h-[1px] bg-[#D7DCE8]" />;
}

function toSingle(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
