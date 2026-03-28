import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CreateServiceScreen() {
  return (
    <View>
      <Link href="/auth/login">Login</Link>
    </View>
  );
}
