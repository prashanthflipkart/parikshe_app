import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";

export const HelpSupportScreen = () => (
  <Screen scroll>
    <View style={styles.header}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>We are here to help</Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>FAQs</Text>
      <Text style={styles.cardMeta}>Quick answers to common questions</Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Raise a doubt</Text>
      <Text style={styles.cardMeta}>Get help from teachers</Text>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Ask now</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Contact support</Text>
      <Text style={styles.cardMeta}>support@parikshe.in</Text>
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
  secondaryButton: {
    marginTop: 12,
    backgroundColor: lightTheme.colors.surfaceAlt,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  }
});
