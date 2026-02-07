import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTestById } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "TestDetail">;

type TestDetail = {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
};

export const TestDetailScreen = ({ navigation, route }: Props) => {
  const { testId } = route.params;
  const [test, setTest] = useState<TestDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTestById(testId)
      .then(data => {
        if (isMounted) {
          setTest(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [testId]);

  return (
    <Screen scroll>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>{test?.title ?? "Test"}</Text>
            <Text style={styles.meta}>
              {test?.questionCount ?? 0} Qs • {test?.durationMinutes ?? 0} mins
            </Text>
            <Text style={styles.meta}>Rules: Timed • Auto-submit</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("TestAttempt", { testId })}
            >
              <Text style={styles.primaryButtonText}>Start test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Save for later</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Screen>
  );
};

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
  },
  secondaryButton: {
    marginTop: 10,
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
