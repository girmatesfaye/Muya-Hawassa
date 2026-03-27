import { Button } from "@/components/ui/button";
import { Text, View } from "@/tw";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-4 bg-white p-4">
      <Text className="text-xl font-medium text-gray-900">
        Blank App Ready!
      </Text>
      <View className="gap-4 w-full max-w-sm mt-4 p-6 border border-gray-200 rounded-2xl shadow-sm">
        <Text className="text-base text-gray-500 font-semibold mb-2">Shadcn UI + NativeWind v5</Text>
        <Button title="Go to Tabs" onPress={() => router.push('/(tabs)/home')} />
        <Button variant="secondary" title="Secondary Action" />
        <Button variant="outline" title="Outline Style" />
      </View>
    </View>
  );
}
