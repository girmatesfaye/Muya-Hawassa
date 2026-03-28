import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { type ComponentProps, type ReactNode } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

type TopBarProps = {
  title: string;
};

type IntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type SectionHeaderProps = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
};

type FieldProps = {
  label: string;
  children: ReactNode;
};

type InputProps = ComponentProps<typeof TextInput> & {
  className?: string;
};

type PhoneInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  countryCode?: string;
  placeholder?: string;
};

type ChoiceOption<T extends string> = {
  label: T;
  value: T;
};

type ChoiceChipsProps<T extends string> = {
  options: readonly ChoiceOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
};

type InfoCardProps = {
  children: ReactNode;
};

type BottomActionProps = {
  primaryLabel: string;
  secondaryText: string;
  secondaryActionLabel: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
};

export function AuthScreen({
  children,
  primaryLabel,
  secondaryText,
  secondaryActionLabel,
  onPrimaryPress,
  onSecondaryPress,
}: {
  children: ReactNode;
} & BottomActionProps) {
  return (
    <View className="flex-1 bg-[#F4F7FC]">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <BottomAction
        primaryLabel={primaryLabel}
        secondaryText={secondaryText}
        secondaryActionLabel={secondaryActionLabel}
        onPrimaryPress={onPrimaryPress}
        onSecondaryPress={onSecondaryPress}
      />
    </View>
  );
}

export function AuthTopBar({ title }: TopBarProps) {
  return (
    <View className="border-b border-[#D9E2F2] bg-white px-6 pb-6 pt-14">
      <View className="relative items-center justify-center">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="absolute left-0 h-11 w-11 items-center justify-center rounded-full bg-[#EEF4FF]"
        >
          <Ionicons name="arrow-back" size={24} color="#1450D2" />
        </Pressable>
        <Text className="text-[22px] font-extrabold tracking-tight text-[#1450D2]">
          {title}
        </Text>
      </View>
    </View>
  );
}

export function AuthIntro({ eyebrow, title, description }: IntroProps) {
  return (
    <View className="mb-8">
      <View className="mb-4 flex-row items-center gap-3">
        <Text className="text-xs font-extrabold uppercase tracking-[3px] text-[#0B7A4B]">
          {eyebrow}
        </Text>
        <View className="h-px w-11 bg-[#22C983]" />
      </View>

      <Text className="mb-3 text-[26px] font-extrabold leading-8 text-[#0F172A]">
        {title}
      </Text>
      <Text className="text-base leading-8 text-[#4B5563]">{description}</Text>
    </View>
  );
}

export function FormSection({
  title,
  icon = "account-outline",
}: SectionHeaderProps) {
  return (
    <View className="mb-7 flex-row items-center gap-3">
      <View className="h-8 w-8 items-center justify-center rounded-full bg-[#EAF1FF]">
        <MaterialCommunityIcons name={icon} size={19} color="#1450D2" />
      </View>
      <Text className="text-base font-extrabold uppercase tracking-wide text-[#4B5563]">
        {title}
      </Text>
    </View>
  );
}

export function FormField({ label, children }: FieldProps) {
  return (
    <View>
      <Text className="mb-3 text-lg font-semibold text-[#111827]">{label}</Text>
      {children}
    </View>
  );
}

export function FormInput({ className = "", ...props }: InputProps) {
  return (
    <TextInput
      placeholderTextColor="#B3BAC6"
      className={`rounded-3xl border border-[#E1E7F0] bg-white px-5 py-5 text-lg text-[#0F172A] ${className}`}
      {...props}
    />
  );
}

export function PhoneInput({
  value,
  onChangeText,
  countryCode = "+251",
  placeholder = "911 234 567",
}: PhoneInputProps) {
  return (
    <View className="flex-row overflow-hidden rounded-3xl border border-[#E1E7F0] bg-white">
      <View className="w-24 items-center justify-center border-r border-[#E1E7F0] bg-[#F8FAFF]">
        <Text className="text-2xl font-semibold text-[#1F2937]">
          {countryCode}
        </Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        placeholder={placeholder}
        placeholderTextColor="#B3BAC6"
        className="flex-1 px-5 py-5 text-2xl text-[#0F172A]"
      />
    </View>
  );
}

export function PasswordInput({
  visible,
  onToggleVisibility,
  ...props
}: InputProps & {
  visible: boolean;
  onToggleVisibility: () => void;
}) {
  return (
    <View className="flex-row items-center rounded-3xl border border-[#E1E7F0] bg-white px-5">
      <TextInput
        placeholderTextColor="#B3BAC6"
        secureTextEntry={!visible}
        className="flex-1 py-5 text-2xl text-[#0F172A]"
        {...props}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={visible ? "Hide password" : "Show password"}
        onPress={onToggleVisibility}
        className="h-11 w-11 items-center justify-center"
      >
        <Ionicons
          name={visible ? "eye-off" : "eye"}
          size={22}
          color="#4B5563"
        />
      </Pressable>
    </View>
  );
}

export function ChoiceChips<T extends string>({
  options,
  selectedValue,
  onChange,
}: ChoiceChipsProps<T>) {
  return (
    <View className="flex-row gap-3">
      {options.map((option) => {
        const active = selectedValue === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            onPress={() => onChange(option.value)}
            className={`flex-1 rounded-2xl border px-3 py-4 ${
              active
                ? "border-[#1450D2] bg-[#EEF4FF]"
                : "border-[#E1E7F0] bg-white"
            }`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                active ? "text-[#1450D2]" : "text-[#1F2937]"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function TagSelector<T extends string>({
  options,
  selectedValue,
  onChange,
}: ChoiceChipsProps<T>) {
  return (
    <View className="mt-3 flex-row flex-wrap gap-2">
      {options.map((option) => {
        const active = selectedValue === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            onPress={() => onChange(option.value)}
            className={`rounded-full border px-4 py-2 ${
              active
                ? "border-[#1450D2] bg-[#EAF1FF]"
                : "border-[#E1E7F0] bg-white"
            }`}
          >
            <Text
              className={`font-semibold ${
                active ? "text-[#1450D2]" : "text-[#4B5563]"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SelectShell({
  value,
  placeholder,
}: {
  value?: string;
  placeholder: string;
}) {
  return (
    <Pressable className="flex-row items-center justify-between rounded-3xl border border-[#E1E7F0] bg-white px-5 py-5">
      <Text className={`text-lg ${value ? "text-[#0F172A]" : "text-[#B3BAC6]"}`}>
        {value ?? placeholder}
      </Text>
      <Ionicons name="chevron-down" size={22} color="#4B5563" />
    </Pressable>
  );
}

export function InfoCard({ children }: InfoCardProps) {
  return (
    <View className="mt-8 rounded-[28px] bg-[#EAF1FF] px-5 py-5">
      <View className="flex-row gap-4">
        <View className="mt-1 h-6 w-6 items-center justify-center rounded-full bg-[#1450D2]">
          <Ionicons name="information" size={14} color="#FFFFFF" />
        </View>
        <View className="flex-1">{children}</View>
      </View>
    </View>
  );
}

function BottomAction({
  primaryLabel,
  secondaryText,
  secondaryActionLabel,
  onPrimaryPress,
  onSecondaryPress,
}: BottomActionProps) {
  return (
    <View className="border-t border-[#D9E2F2] bg-white px-6 pb-8 pt-4">
      <Pressable
        accessibilityRole="button"
        onPress={onPrimaryPress}
        className="mb-5 rounded-[22px] bg-[#1450D2] px-6 py-5"
      >
        <Text className="text-center text-xl font-extrabold text-white">
          {primaryLabel}
        </Text>
      </Pressable>

      <Text className="text-center text-base text-[#374151]">
        {secondaryText}{" "}
        <Text className="font-bold text-[#1450D2]" onPress={onSecondaryPress}>
          {secondaryActionLabel}
        </Text>
      </Text>
    </View>
  );
}
