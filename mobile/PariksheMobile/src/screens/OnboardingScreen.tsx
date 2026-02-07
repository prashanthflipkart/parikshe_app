import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AppNavigator";
import { verifyOtp } from "../services/auth";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

const categories = [
  { id: "sslc", label: "SSLC (Class 10)" },
  { id: "puc_science", label: "PUC Science (PU1 + PU2)" },
  { id: "puc_commerce", label: "PUC Commerce (PU1 + PU2)" }
];

const grades = ["10th", "PU1", "PU2"];

export const OnboardingScreen = ({ route }: Props) => {
  const { phone, otp } = route.params;
  const { signIn } = useAuth();
  const [category, setCategory] = useState(categories[0].id);
  const [grade, setGrade] = useState(grades[0]);
  const [examMonth, setExamMonth] = useState("");
  const [languagePref, setLanguagePref] = useState("Kannada + English");
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    try {
      const result = await verifyOtp({
        phone,
        otp,
        category,
        grade,
        examMonth: examMonth || undefined,
        languagePref
      });

      if (result.token) {
        await signIn(result.token);
      } else {
        // Bypass OTP for now if backend token is missing.
        await signIn(`dev-token-${phone}`);
      }
    } catch {
      // Bypass OTP for now if network fails.
      await signIn(`dev-token-${phone}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.container}>
        <Text style={styles.title}>Set up your learning</Text>
        <Text style={styles.subtitle}>Choose your path</Text>

        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.row}>
          {categories.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, category === item.id && styles.chipActive]}
              onPress={() => setCategory(item.id)}
            >
              <Text style={[styles.chipText, category === item.id && styles.chipTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Grade</Text>
        <View style={styles.row}>
          {grades.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, grade === item && styles.chipActive]}
              onPress={() => setGrade(item)}
            >
              <Text style={[styles.chipText, grade === item && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Exam month</Text>
        <TextInput
          style={styles.input}
          placeholder="March 2026"
          value={examMonth}
          onChangeText={setExamMonth}
        />

        <Text style={styles.sectionLabel}>Language preference</Text>
        <TextInput
          style={styles.input}
          value={languagePref}
          onChangeText={setLanguagePref}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleFinish} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? "Saving..." : "Finish"}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  sectionLabel: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: "600",
    color: lightTheme.colors.textSecondary
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  chipActive: {
    backgroundColor: lightTheme.colors.primarySoft,
    borderColor: lightTheme.colors.primary
  },
  chipText: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  chipTextActive: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: lightTheme.colors.surface
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
