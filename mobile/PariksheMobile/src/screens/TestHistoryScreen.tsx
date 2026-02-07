import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getTestAttempts } from "../services/catalog";
import { getLocalTestAttempts, TestAttempt } from "../services/storage";
import { useAuth } from "../context/AuthContext";

export const TestHistoryScreen = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<TestAttempt[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    let isMounted = true;
    Promise.all([getToken(), getLocalTestAttempts()])
      .then(([token, local]) => Promise.all([getTestAttempts(token), Promise.resolve(local)]))
      .then(([remote, local]) => {
        if (!isMounted) {
          return;
        }
        const remoteAttempts = (remote.attempts ?? []) as TestAttempt[];
        const merged = [...remoteAttempts, ...local].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setItems(merged);
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
        <Text style={styles.title}>Test History</Text>
        <Text style={styles.subtitle}>Recent attempts</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>No attempts yet</Text>
      ) : (
        items.map(item => (
          <View key={`${item.attemptId}-${item.createdAt}`} style={styles.card}>
            <Text style={styles.cardTitle}>{item.testTitle}</Text>
            <Text style={styles.cardMeta}>
              {item.score}/{item.total} • {item.accuracy}% •{" "}
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </Screen>
  );
};

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
  empty: {
    marginTop: 24,
    marginHorizontal: 16,
    color: lightTheme.colors.textSecondary
  },
  loader: {
    marginTop: 24
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
  }
});
