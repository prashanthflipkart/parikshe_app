import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";

export const CouponsReferralScreen = () => (
  <Screen scroll>
    <View style={styles.header}>
      <Text style={styles.title}>Coupons & Referral</Text>
      <Text style={styles.subtitle}>Share and save</Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your referral code</Text>
      <Text style={styles.cardMeta}>PARIKSHE123</Text>
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Share now</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Coupon wallet</Text>
      <Text style={styles.cardMeta}>Open coupon: PARIKSHE10</Text>
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: lightTheme.colors.textMuted
  },
  card: {
    backgroundColor: lightTheme.colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.border,
    borderWidth: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: lightTheme.colors.textPrimary,
    fontWeight: "600"
  }
});
