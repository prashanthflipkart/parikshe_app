import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTests } from "../services/catalog";

const cards = [
  "Recommended",
  "Topic tests",
  "Chapter tests",
  "Grand tests",
  "Previous papers"
];

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const TestScreen = () => {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<
    { id: string; title: string; questionCount: number; durationMinutes: number }[]
  >([]);

  useEffect(() => {
    let isMounted = true;
    getTests()
      .then(data => {
        if (isMounted) {
          setTests(data.tests ?? []);
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
  }, []);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Test</Text>
          <TouchableOpacity style={styles.headerIconButton}>
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Practice daily</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recommended for you</Text>
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : tests[0] ? (
          <>
            <Text style={styles.cardMeta}>
              {tests[0].title} • {tests[0].questionCount} Qs
            </Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("TestDetail", { testId: tests[0].id })}
            >
              <Text style={styles.secondaryButtonText}>Start</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.cardMeta}>No tests available</Text>
        )}
      </View>
      {cards.slice(1).map(item => (
        <TouchableOpacity key={item} style={styles.card}>
          <Text style={styles.cardTitle}>{item}</Text>
          <Text style={styles.cardMeta}>Tap to explore</Text>
        </TouchableOpacity>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightTheme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  headerIcon: {
    fontSize: 14
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
  loader: {
    marginTop: 12
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: lightTheme.colors.surfaceAlt,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  }
});
