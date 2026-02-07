import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const items = [
  { label: "My Purchases", route: "PurchaseHistory" },
  { label: "Downloads", route: "Downloads" },
  { label: "Coupons & Referral", route: "CouponsReferral" },
  { label: "Help & Support", route: "HelpSupport" },
  { label: "Settings", route: "Settings" }
] as const;

export const ProfileScreen = () => (
  <ProfileContent />
);

const ProfileContent = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>P</Text>
        </View>
        <View>
          <Text style={styles.title}>Student</Text>
          <Text style={styles.subtitle}>SSLC • Kannada + English</Text>
        </View>
      </View>
      {items.map(item => (
        <TouchableOpacity
          key={item.label}
          style={styles.card}
          onPress={() => {
            navigation.navigate(item.route);
          }}
        >
          <Text style={styles.cardTitle}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: lightTheme.colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
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
  logoutButton: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  logoutText: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  }
});
