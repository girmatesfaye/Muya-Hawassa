import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { type ReactNode, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type ClientDashboardProps = {
  userName: string;
};

type RequestStatus = "Open" | "Done";

type RequestItem = {
  id: string;
  title: string;
  date: string;
  status: RequestStatus;
  action: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBackground: string;
  iconColor: string;
  location: string;
  description: string;
  serviceId: string;
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

const recentRequests: readonly RequestItem[] = [
  {
    id: "1",
    title: "Fix Leaking Pipe",
    date: "March 25, 2026",
    status: "Open",
    action: "View",
    icon: "hammer-outline",
    iconBackground: "#EAF1FF",
    iconColor: "#1450D2",
    location: "Tabor, Hawassa",
    description:
      "The main pipe in the kitchen is leaking heavily. Needs urgent repair to prevent water damage to the cabinets.",
    serviceId: "FX-8829",
  },
  {
    id: "2",
    title: "Door Lock Repair",
    date: "March 18, 2026",
    status: "Done",
    action: "Details",
    icon: "checkmark-circle",
    iconBackground: "#DFFAF1",
    iconColor: "#047857",
    location: "Piassa, Hawassa",
    description:
      "Front door lock became loose and difficult to open. Repair was completed successfully and the lock is working well.",
    serviceId: "FX-8811",
  },
] as const;

export function ClientDashboard({ userName }: ClientDashboardProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  const [selectedWorker, setSelectedWorker] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const selectedRequest = useMemo(
    () =>
      recentRequests.find((request) => request.id === selectedRequestId) ?? null,
    [selectedRequestId],
  );

  const openRequestSheet = (request: RequestItem) => {
    setSelectedRequestId(request.id);
    setSelectedWorker("");
    setRating(request.status === "Done" ? 5 : 0);
    setReview("");
  };

  const closeRequestSheet = () => {
    setSelectedRequestId(null);
  };

  return (
    <>
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
            Welcome, {userName}!
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
                      <View
                        className={`rounded-full px-4 py-2 ${
                          request.status === "Done"
                            ? "bg-[#CCFBEF]"
                            : "bg-[#FFE8C2]"
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            request.status === "Done"
                              ? "text-[#047857]"
                              : "text-[#8A5A00]"
                          }`}
                        >
                          {request.status === "Done" ? "Done" : "Open"}
                        </Text>
                      </View>

                      <Pressable
                        accessibilityRole="button"
                        onPress={() => openRequestSheet(request)}
                      >
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

      <RequestDetailsSheet
        request={selectedRequest}
        selectedWorker={selectedWorker}
        onChangeWorker={setSelectedWorker}
        rating={rating}
        onChangeRating={setRating}
        review={review}
        onChangeReview={setReview}
        onClose={closeRequestSheet}
      />
    </>
  );
}

function RequestDetailsSheet({
  request,
  selectedWorker,
  onChangeWorker,
  rating,
  onChangeRating,
  review,
  onChangeReview,
  onClose,
}: {
  request: RequestItem | null;
  selectedWorker: string;
  onChangeWorker: (value: string) => void;
  rating: number;
  onChangeRating: (value: number) => void;
  review: string;
  onChangeReview: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={Boolean(request)}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-[#0F172A]/25">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="max-h-[88%] rounded-t-[36px] bg-white px-6 pb-8 pt-3">
          <View className="items-center">
            <View className="mb-5 h-2 w-20 rounded-full bg-[#DDE4F2]" />
          </View>

          {request ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 12 }}
            >
              <Text className="text-center text-[24px] font-extrabold text-[#0F172A]">
                REQUEST DETAILS
              </Text>
              <Text className="mt-3 text-center text-[14px] font-bold uppercase tracking-[3px] text-[#C3C8D9]">
                SERVICE ID: {request.serviceId}
              </Text>

              <View className="mt-8 rounded-[28px] bg-[#F4F7FF] px-5 py-5">
                <View className="flex-row items-center gap-4">
                  <View className="h-20 w-20 items-center justify-center rounded-[24px] bg-[#DCE7FF]">
                    <Ionicons
                      name="hammer-outline"
                      size={34}
                      color="#1450D2"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[18px] font-extrabold text-[#0F172A]">
                      {request.title}
                    </Text>

                    <View className="mt-3 flex-row items-center gap-2">
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#475569"
                      />
                      <Text className="text-[16px] text-[#334155]">
                        {request.date}
                      </Text>
                    </View>

                    <View className="mt-1 flex-row items-center gap-2">
                      <Ionicons
                        name="location"
                        size={20}
                        color="#DC2626"
                      />
                      <Text className="text-[16px] text-[#334155]">
                        {request.location}
                      </Text>
                    </View>
                  </View>

                  <View className="self-start rounded-full bg-[#FFE8C2] px-4 py-2">
                    <Text className="text-sm font-bold text-[#D97706]">
                      {request.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <SheetSection title="Description" className="mt-8">
                <Text className="text-[16px] leading-8 text-[#334155]">
                  {request.description}
                </Text>
              </SheetSection>

              <SheetSection title="Select Professional" className="mt-8">
                <View className="flex-row items-center rounded-[22px] bg-[#EEF4FF] px-4 py-4">
                  <Ionicons name="search-outline" size={24} color="#6B7280" />
                  <TextInput
                    value={selectedWorker}
                    onChangeText={onChangeWorker}
                    placeholder="Search for worker by name or phone..."
                    placeholderTextColor="#A7AFC0"
                    className="ml-3 flex-1 text-[16px] text-[#0F172A]"
                  />
                </View>
              </SheetSection>

              <View className="mt-8 h-px bg-[#DCE4F3]" />

              <View className="mt-8 items-center">
                <Text className="text-center text-[22px] font-extrabold text-[#0F172A]">
                  RATE YOUR EXPERIENCE
                </Text>
                <Text className="mt-2 text-center text-[16px] italic text-[#64748B]">
                  How was your overall experience?
                </Text>

                <View className="mt-6 flex-row gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Pressable
                      key={value}
                      accessibilityRole="button"
                      onPress={() => onChangeRating(value)}
                    >
                      <Ionicons
                        name={value <= rating ? "star" : "star-outline"}
                        size={40}
                        color="#1450D2"
                      />
                    </Pressable>
                  ))}
                </View>
              </View>

              <SheetSection title="Detailed Review" className="mt-10">
                <TextInput
                  value={review}
                  onChangeText={onChangeReview}
                  multiline
                  textAlignVertical="top"
                  placeholder="Share details about your experience..."
                  placeholderTextColor="#A7AFC0"
                  className="min-h-[140px] rounded-[24px] bg-[#EEF4FF] px-5 py-4 text-[16px] leading-7 text-[#0F172A]"
                />
              </SheetSection>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
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

function SheetSection({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <View className={className}>
      <Text className="mb-4 text-[14px] font-extrabold uppercase tracking-[3px] text-[#1450D2]">
        {title}
      </Text>
      {children}
    </View>
  );
}
