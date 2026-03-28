import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

type WorkerDashboardProps = {
  userName: string;
};

const workerStats = [
  { label: "Open Leads", value: "12", icon: "briefcase-search-outline" as const },
  { label: "Completed", value: "34", icon: "check-decagram-outline" as const },
  { label: "Rating", value: "4.8", icon: "star-outline" as const },
] as const;

const jobs = [
  {
    id: "1",
    title: "Emergency Pipe Repair",
    area: "Piassa, Hawassa",
    budget: "ETB 1,200",
  },
  {
    id: "2",
    title: "Wall Painting",
    area: "Tabor, Hawassa",
    budget: "ETB 2,800",
  },
] as const;

export function WorkerDashboard({ userName }: WorkerDashboardProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      className="flex-1 bg-[#F4F7FC]"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="border-b border-[#D9E2F2] bg-white px-6 pb-6 pt-14">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-bold uppercase tracking-[2px] text-[#0B7A4B]">
              Worker Dashboard
            </Text>
            <Text className="mt-2 text-[24px] font-extrabold text-[#0F172A]">
              Welcome back, {userName}
            </Text>
          </View>

          <View className="h-14 w-14 items-center justify-center rounded-[18px] bg-[#1450D2]">
            <MaterialCommunityIcons
              name="hammer-wrench"
              size={26}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>

      <View className="px-6 pt-6">
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/profile")}
          className="rounded-[28px] bg-[#0F172A] px-6 py-6"
          style={{ boxShadow: "0 20px 38px rgba(15, 23, 42, 0.14)" }}
        >
          <Text className="text-[20px] font-extrabold text-white">
            Complete your profile
          </Text>
          <Text className="mt-2 text-[16px] leading-7 text-[#CBD5E1]">
            Add skills, portfolio images, and service areas to receive more job
            requests.
          </Text>
        </Pressable>

        <View className="mt-8 flex-row gap-3">
          {workerStats.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 rounded-[24px] bg-white px-4 py-5"
              style={{ boxShadow: "0 12px 28px rgba(15, 23, 42, 0.06)" }}
            >
              <MaterialCommunityIcons
                name={stat.icon}
                size={22}
                color="#1450D2"
              />
              <Text className="mt-4 text-[22px] font-extrabold text-[#0F172A]">
                {stat.value}
              </Text>
              <Text className="mt-1 text-sm text-[#64748B]">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className="mt-10">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-[20px] font-extrabold text-[#0F172A]">
              Nearby Requests
            </Text>
            <Pressable accessibilityRole="button">
              <Text className="text-[15px] font-bold text-[#1450D2]">
                View All
              </Text>
            </Pressable>
          </View>

          <View className="gap-4">
            {jobs.map((job) => (
              <View
                key={job.id}
                className="rounded-[28px] border border-[#E7EDF6] bg-white px-5 py-5"
                style={{ boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}
              >
                <View className="flex-row items-start gap-4">
                  <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color="#1450D2"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[18px] font-extrabold text-[#0F172A]">
                      {job.title}
                    </Text>
                    <Text className="mt-1 text-[15px] text-[#64748B]">
                      {job.area}
                    </Text>
                    <Text className="mt-3 text-[15px] font-bold text-[#0B7A4B]">
                      Budget: {job.budget}
                    </Text>
                  </View>

                  <Pressable
                    accessibilityRole="button"
                    className="rounded-full bg-[#1450D2] px-4 py-2"
                  >
                    <Text className="font-bold text-white">Bid</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
