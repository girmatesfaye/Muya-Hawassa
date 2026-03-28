import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { type ReactNode, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type WorkerDashboardProps = {
  userName: string;
};

const profileDetails = [
  {
    label: "Skills",
    value: "Plumbing, Pipe Repair",
    icon: "wrench" as const,
  },
  {
    label: "Experience",
    value: "5 years (Senior)",
    icon: "chart-bar" as const,
  },
  {
    label: "Service Area",
    value: "Tabor, Hawassa",
    icon: "map-marker" as const,
  },
] as const;

const portfolioItems = [
  { id: "1", title: "Pipe repair", tone: "#E2E8F0", icon: "wrench" as const },
  {
    id: "2",
    title: "Tool setup",
    tone: "#F3E8D8",
    icon: "toolbox-outline" as const,
  },
  {
    id: "3",
    title: "Sink install",
    tone: "#DDE7F1",
    icon: "faucet" as const,
  },
] as const;

const reviews = [
  {
    id: "1",
    quote: '"Great work, very fast!"',
    author: "Abebe K.",
    date: "March 25",
  },
  {
    id: "2",
    quote: '"Professional and clean"',
    author: "Kebede T.",
    date: "March 22",
  },
] as const;

export function WorkerDashboard({ userName }: WorkerDashboardProps) {
  const [availableForJobs, setAvailableForJobs] = useState(true);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      className="flex-1 bg-[#F4F7FC]"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-[#1450D2] px-4 pb-12 pt-14">
        <View className="mb-10 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center rounded-full bg-[#2F67DA]"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <Text className="text-[18px] font-extrabold text-white">
            Worker Profile
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
            onPress={() =>
              router.push({
                pathname: "/worker/edit-profile",
                params: {
                  name: userName,
                  skills: profileDetails[0].value,
                  experience: profileDetails[1].value,
                  serviceArea: profileDetails[2].value,
                },
              })
            }
            className="h-12 w-12 items-center justify-center rounded-full bg-[#2F67DA]"
          >
            <Ionicons name="create-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <View className="items-center">
          <View className="relative">
            <View className="h-[146px] w-[146px] items-center justify-center rounded-full border-4 border-white bg-[#11304E]">
              <Text className="text-[44px] font-extrabold text-white">
                {getInitials(userName)}
              </Text>
            </View>

            <View className="absolute bottom-1 right-0 h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#0B8A5A]">
              <MaterialCommunityIcons
                name="shield-check"
                size={22}
                color="#FFFFFF"
              />
            </View>
          </View>

          <Text className="mt-5 text-[22px] font-extrabold text-white">
            {userName}
          </Text>

          <View className="mt-3 flex-row items-center gap-2">
            <Text className="text-[20px] text-[#FFC857]">★★★★★</Text>
            <Text className="text-[16px] font-bold text-white">4.9</Text>
            <Text className="text-[16px] text-[#DCE7FF]">(24 reviews)</Text>
          </View>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: availableForJobs }}
            onPress={() => setAvailableForJobs((current) => !current)}
            className="mt-8 w-full max-w-[300px] flex-row items-center justify-between rounded-full bg-white px-7 py-4"
          >
            <Text className="text-[17px] font-semibold text-[#0F172A]">
              I&apos;m Available for Jobs
            </Text>

            <View
              className={`h-9 w-[62px] rounded-full px-1 ${
                availableForJobs ? "bg-[#DBF5E9]" : "bg-[#E5E7EB]"
              }`}
            >
              <View
                className={`h-7 w-7 rounded-full ${
                  availableForJobs
                    ? "ml-auto mt-1 bg-[#1450D2]"
                    : "mt-1 bg-white"
                } items-center justify-center`}
              >
                {availableForJobs ? (
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                ) : null}
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View className="-mt-7 px-4">
        <View
          className="rounded-[28px] bg-white px-5 py-6"
          style={{ boxShadow: "0 16px 34px rgba(15, 23, 42, 0.10)" }}
        >
          <View className="gap-6">
            {profileDetails.map((item) => (
              <View key={item.label} className="flex-row items-start gap-4">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF]">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={22}
                    color="#1450D2"
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-sm uppercase tracking-[2px] text-[#334155]">
                    {item.label}
                  </Text>
                  <Text className="mt-1 text-[17px] text-[#0F172A]">
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 flex-row gap-4">
          <ActionButton
            label="Call"
            icon="call-outline"
            className="flex-1 bg-[#1450D2]"
            textClassName="text-white"
          />
          <ActionButton
            label="Telegram"
            icon="chatbox-ellipses-outline"
            className="flex-1 bg-[#1450D2]"
            textClassName="text-white"
          />
        </View>

        <ActionButton
          label="TikTok Profile"
          icon="musical-notes-outline"
          className="mt-4 bg-[#273142]"
          textClassName="text-white"
          fullWidth
        />

        <SectionCard
          title="Portfolio"
          subtitle="(3 photos)"
          actionLabel="View All"
          className="mt-6"
        >
          <View className="flex-row gap-2">
            {portfolioItems.map((item) => (
              <View
                key={item.id}
                className="h-[108px] flex-1 overflow-hidden rounded-[18px]"
                style={{ backgroundColor: item.tone }}
              >
                <View className="flex-1 items-center justify-center bg-black/5">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={34}
                    color="#475569"
                  />
                </View>
              </View>
            ))}
          </View>
        </SectionCard>

        <SectionCard
          title="Recent Reviews"
          actionLabel="View All 24"
          className="mt-6"
        >
          <View className="gap-4">
            {reviews.map((review) => (
              <View
                key={review.id}
                className="rounded-[22px] bg-[#EEF4FF] px-4 py-4"
              >
                <Text className="text-[18px] text-[#F59E0B]">★★★★★</Text>
                <Text className="mt-3 text-[16px] leading-7 text-[#0F172A]">
                  {review.quote}
                </Text>
                <Text className="mt-3 text-[15px] text-[#334155]">
                  - {review.author} | {review.date}
                </Text>
              </View>
            ))}
          </View>
        </SectionCard>
      </View>
    </ScrollView>
  );
}

function ActionButton({
  label,
  icon,
  className,
  textClassName,
  fullWidth = false,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  className: string;
  textClassName: string;
  fullWidth?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      className={`min-h-[62px] flex-row items-center justify-center gap-3 rounded-[18px] px-5 ${className} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      <Ionicons name={icon} size={22} color="#FFFFFF" />
      <Text className={`text-[16px] font-bold ${textClassName}`}>{label}</Text>
    </Pressable>
  );
}

function SectionCard({
  title,
  subtitle,
  actionLabel,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <View
      className={`rounded-[28px] bg-white px-5 py-5 ${className ?? ""}`}
      style={{ boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)" }}
    >
      <View className="mb-5 flex-row items-center justify-between">
        <View className="flex-row items-end gap-2">
          <Text className="text-[18px] font-extrabold text-[#0F172A]">
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-[15px] text-[#334155]">{subtitle}</Text>
          ) : null}
        </View>

        <Pressable accessibilityRole="button">
          <Text className="text-[15px] font-semibold text-[#1450D2]">
            {actionLabel}
          </Text>
        </Pressable>
      </View>

      {children}
    </View>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
