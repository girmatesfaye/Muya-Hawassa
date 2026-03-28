import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type ClientDashboardProps = {
  userName: string;
};

const categories = [
  {
    label: "Plumbing",
    icon: "water-outline" as const,
    iconColor: "#2563EB",
    iconBackground: "#EEF4FF",
  },
  {
    label: "Electrical",
    icon: "flash-outline" as const,
    iconColor: "#F59E0B",
    iconBackground: "#FFF7E8",
  },
  {
    label: "Carpentry",
    icon: "hammer-outline" as const,
    iconColor: "#10B981",
    iconBackground: "#ECFDF5",
  },
  {
    label: "Painting",
    icon: "color-fill-outline" as const,
    iconColor: "#EF4444",
    iconBackground: "#FEF2F2",
  },
] as const;

const recentRequests = [
  {
    id: "1",
    title: "Fix Leaking Pipe",
    date: "March 25, 2026",
    status: "Open",
    action: "View",
    icon: "hammer-outline" as const, // Changed to a valid Ionicons icon
    iconBackground: "#EAF1FF",
    iconColor: "#1450D2",
  },
  {
    id: "2",
    title: "Door Lock Repair",
    date: "March 18, 2026",
    status: "Done",
    action: "Details",
    icon: "checkmark-circle" as const,
    iconBackground: "#DFFAF1",
    iconColor: "#047857",
  },
] as const;

export function ClientDashboard({ userName }: ClientDashboardProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      className="flex-1 bg-[#F4F7FC]"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="border-b border-[#D9E2F2] bg-white px-6 pb-6 pt-10">
        <View className="flex-row items-center gap-4">
          <View className="h-[42px] w-[42px] items-center justify-center rounded-[20px] bg-[#1450D2]">
            <MaterialCommunityIcons name="wrench" size={24} color="#FFFFFF" />
          </View>

          <Text className="text-[15px] font-extrabold tracking-tight text-[#1450D2]">
            FixIt Hawassa
          </Text>
        </View>
      </View>

      <View className="px-6 pt-5">
        <Text className="text-[22px] font-extrabold text-[#0F172A]">
          Welcome, {userName}!{" "}
          <Text className="text-[22px] font-extrabold text-[#F59E0B]">👋</Text>
        </Text>
        <Text className="mt-1 text-[18px] text-[#475569]">
          Find trusted workers for any job
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/createService")}
          className="mt-8 rounded-[28px] bg-[#1450D2] px-6 py-7"
          style={{
            boxShadow: "0 20px 40px rgba(20, 80, 210, 0.16)",
          }}
        >
          <View className="flex-row items-center gap-5">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#4C7DE0]">
              <MaterialCommunityIcons name="tools" size={36} color="#FFFFFF" />
            </View>

            <View className="flex-1">
              <Text className="text-[19px] font-extrabold text-white">
                Request Service
              </Text>
              <Text className="mt-2 text-[16px] leading-7 text-[#DCE7FF]">
                Get matched with skilled workers
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={34} color="#FFFFFF" />
          </View>
        </Pressable>

        <DashboardSection
          title="Quick Categories"
          actionLabel="SEE ALL"
          className="mt-10"
        >
          <View className="flex-row justify-between gap-3">
            {categories.map((category) => (
              <Pressable
                key={category.label}
                accessibilityRole="button"
                className="flex-1 items-center"
              >
                <View
                  className="mb-4 h-[110px] w-full items-center justify-center rounded-[24px] border border-[#E1E7F0] bg-white"
                  style={{ boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)" }}
                >
                  <View
                    className="h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: category.iconBackground }}
                  >
                    <Ionicons
                      name={category.icon}
                      size={28}
                      color={category.iconColor}
                    />
                  </View>
                </View>
                <Text className="text-center text-[15px] font-semibold text-[#0F172A]">
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </DashboardSection>

        <DashboardSection
          title="Recent Requests"
          actionLabel="View All"
          className="mt-12"
        >
          <View className="gap-5">
            {recentRequests.map((request) => (
              <View
                key={request.id}
                className="rounded-[28px] border border-[#E7EDF6] bg-white px-5 py-5"
                style={{ boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}
              >
                <View className="flex-row items-center gap-4">
                  <View
                    className="h-[88px] w-[88px] items-center justify-center rounded-full"
                    style={{ backgroundColor: request.iconBackground }}
                  >
                    <Ionicons
                      name={request.icon}
                      size={34}
                      color={request.iconColor}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[18px] font-extrabold text-[#0F172A]">
                      {request.title}
                    </Text>
                    <Text className="mt-1 text-[16px] text-[#6B7280]">
                      {request.date}
                    </Text>
                  </View>

                  <View className="items-end gap-5">
                    <View className="rounded-full bg-[#FFE8C2] px-4 py-2">
                      <Text
                        className={`text-sm font-bold ${
                          request.status === "Done"
                            ? "text-[#047857]"
                            : "text-[#8A5A00]"
                        }`}
                      >
                        {request.status === "Done" ? "✓ " : ""}
                        {request.status}
                      </Text>
                    </View>

                    <Pressable accessibilityRole="button">
                      <Text className="text-[16px] font-bold text-[#1450D2]">
                        {request.action}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </DashboardSection>
      </View>
    </ScrollView>
  );
}

function DashboardSection({
  title,
  actionLabel,
  className,
  children,
}: {
  title: string;
  actionLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <View className={className}>
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-[20px] font-extrabold text-[#0F172A]">
          {title}
        </Text>
        <Pressable accessibilityRole="button">
          <Text className="text-[15px] font-bold uppercase tracking-[1.5px] text-[#1450D2]">
            {actionLabel}
          </Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
}
