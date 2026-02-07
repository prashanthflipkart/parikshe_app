import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PurchaseSuccess">;

export const PurchaseSuccessScreen = ({ navigation }: Props) => (
  <Screen scroll>
    <View style={styles.card}>
      <Text style={styles.title}>You're enrolled</Text>
      <Text style={styles.meta}>Welcome to Parikshe Full-year Batch</Text>
      <Text style={styles.meta}>Checklist:</Text>
      <Text style={styles.meta}>• Join WhatsApp/Telegram group</Text>
      <Text style={styles.meta}>• Set exam date</Text>
      <Text style={styles.meta}>• Start Day 1 plan</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.primaryButtonText}>Start learning</Text>
      </TouchableOpacity>
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.surface,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.border,
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: lightTheme.colors.textSecondary
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
