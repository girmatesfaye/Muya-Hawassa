import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const skills = [
  { label: "Plumbing", icon: "wrench" as const },
  { label: "Electrical", icon: "lightning-bolt-outline" as const },
  { label: "Carpentry", icon: "hammer" as const },
  { label: "Painting", icon: "brush" as const },
];

const levels = ["New", "Medium", "Old"] as const;

export default function CreateServiceScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(skills[0].label);
  const [selectedLevel, setSelectedLevel] =
    useState<(typeof levels)[number]>("New");
  const [location, setLocation] = useState("Hawassa, Piazza area...");
  const [minBudget, setMinBudget] = useState("500");
  const [maxBudget, setMaxBudget] = useState("2000");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-[#F2F3F7]"
        contentContainerStyle={{ paddingBottom: 34, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-[#E2E4EA] bg-white px-4 pb-4 pt-3">
          <View className="flex-row items-center justify-between">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </Pressable>

            <Text className="text-[35px] font-bold text-[#111827]">
              Request Service
            </Text>

            <View className="h-10 w-10" />
          </View>
        </View>

        <SectionCard>
          <Text className="text-[45px] font-extrabold text-[#111827]">
            Job Details
          </Text>
          <Text className="mt-1 text-[24px] tracking-[1.2px] text-[#6B7280]">
            CORE INFORMATION
          </Text>

          <InputField
            label="Job Title *"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Fix Leaking Pipe"
          />

          <InputField
            label="Description *"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the problem in detail..."
            multiline
          />

          <Text className="mb-3 text-[30px] text-[#374151]">
            Skill Category *
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 2 }}
            className="mb-5"
          >
            {skills.map((skill) => {
              const active = skill.label === selectedSkill;

              return (
                <Pressable
                  key={skill.label}
                  accessibilityRole="button"
                  onPress={() => setSelectedSkill(skill.label)}
                  className={`w-[98px] items-center rounded-[16px] border px-2 pb-4 pt-5 ${
                    active
                      ? "border-[#1450D2] bg-[#1450D2]"
                      : "border-[#BBC3D5] bg-white"
                  }`}
                >
                  <MaterialCommunityIcons
                    name={skill.icon}
                    size={30}
                    color={active ? "#FFFFFF" : "#1450D2"}
                  />
                  <Text
                    className={`mt-5 text-center text-[18px] font-semibold ${
                      active ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {skill.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text className="mb-3 text-[30px] text-[#4B5563]">
            Maintenance Level *
          </Text>
          <View className="flex-row gap-2">
            {levels.map((level) => {
              const active = selectedLevel === level;

              return (
                <Pressable
                  key={level}
                  accessibilityRole="button"
                  onPress={() => setSelectedLevel(level)}
                  className={`min-h-[52px] flex-1 items-center justify-center rounded-[10px] ${
                    active ? "bg-[#1450D2]" : "bg-[#EAECEF]"
                  }`}
                >
                  <Text
                    className={`text-[18px] font-semibold ${
                      active ? "text-white" : "text-[#1F2937]"
                    }`}
                  >
                    {level}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </SectionCard>

        <SectionCard>
          <Text className="mb-4 text-[45px] font-extrabold text-[#111827]">
            Location
          </Text>

          <View className="mb-3 min-h-[54px] flex-row items-center gap-3 rounded-[10px] bg-[#E8EAEE] px-4">
            <Ionicons name="location" size={20} color="#1450D2" />
            <TextInput
              value={location}
              onChangeText={setLocation}
              className="flex-1 text-[19px] text-[#4B5563]"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="h-[180px] overflow-hidden rounded-[12px] bg-[#377CA1]">
            <Image
              source="https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=900&q=70"
              contentFit="cover"
              className="h-full w-full"
            />
            <View className="absolute inset-0 bg-[#1E6E9A]/35" />

            <Pressable className="absolute bottom-3 right-3 min-h-[42px] flex-row items-center gap-2 rounded-full bg-white px-4">
              <Ionicons name="scan-outline" size={18} color="#1450D2" />
              <Text className="text-[20px] font-semibold text-[#111827]">
                Expand Map
              </Text>
            </Pressable>
          </View>
        </SectionCard>

        <SectionCard>
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-[45px] font-extrabold text-[#111827]">
              Budget
            </Text>
            <Text className="text-[22px] font-semibold text-[#6B7280]">
              OPTIONAL
            </Text>
          </View>

          <View className="flex-row gap-3">
            <BudgetInput
              label="Min ETB"
              value={minBudget}
              onChangeText={setMinBudget}
            />
            <BudgetInput
              label="Max ETB"
              value={maxBudget}
              onChangeText={setMaxBudget}
            />
          </View>

          <Text className="mt-4 text-[24px] leading-8 text-[#6B7280]">
            Setting a budget range helps attract providers who match your
            expectations.
          </Text>
        </SectionCard>

        <View className="px-4">
          <Pressable
            accessibilityRole="button"
            className="min-h-[60px] items-center justify-center rounded-[10px] bg-[#2F67DA]"
            style={{ boxShadow: "0 8px 18px rgba(15, 23, 42, 0.14)" }}
          >
            <Text className="text-[33px] font-bold text-white">
              Submit Request ➤
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <View
      className="mx-4 rounded-[12px] bg-[#F7F8FA] p-4"
      style={{ borderWidth: 1, borderColor: "#E3E5EA" }}
    >
      {children}
    </View>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View className="mb-4 mt-4 gap-2">
      <Text className="text-[30px] text-[#4B5563]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A1A6B2"
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className={`rounded-[10px] bg-[#E9EBEF] px-4 text-[32px] text-[#111827] ${
          multiline ? "min-h-[130px] py-4" : "min-h-[58px]"
        }`}
      />
    </View>
  );
}

function BudgetInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-[29px] text-[#4B5563]">{label}</Text>
      <View className="min-h-[68px] flex-row items-center gap-2 rounded-[10px] bg-[#E9EBEF] px-4">
        <Text className="text-[29px] font-semibold text-[#6B7280]">ETB</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          className="flex-1 text-[34px] font-bold text-[#4B5563]"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
}
