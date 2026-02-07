import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getAnalyticsSummary } from "../services/analytics";

type Summary = {
  progressPercent: number;
  accuracyPercent: number;
  timeSpentMinutes: number;
  weakAreas: string[];
};

export const AnalyticsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAnalyticsSummary()
      .then(data => {
        if (isMounted) {
          setSummary(data);
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
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Your progress snapshot</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Progress</Text>
            <View style={styles.barTrack}>
              <View
                style={[styles.barFill, { width: `${summary?.progressPercent ?? 0}%` }]}
              />
            </View>
            <Text style={styles.cardMeta}>{summary?.progressPercent ?? 0}%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Accuracy</Text>
            <View style={styles.barTrack}>
              <View
                style={[styles.barFill, { width: `${summary?.accuracyPercent ?? 0}%` }]}
              />
            </View>
            <Text style={styles.cardMeta}>{summary?.accuracyPercent ?? 0}%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Time Spent</Text>
            <Text style={styles.cardMeta}>{summary?.timeSpentMinutes ?? 0} mins</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weak Areas</Text>
            <Text style={styles.cardMeta}>
              {summary?.weakAreas?.join(", ") || "None"}
            </Text>
          </View>
        </>
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
  barTrack: {
    marginTop: 8,
    height: 8,
    backgroundColor: lightTheme.colors.surfaceAlt,
    borderRadius: 8
  },
  barFill: {
    height: 8,
    backgroundColor: lightTheme.colors.primary,
    borderRadius: 8
  },
  loader: {
    marginTop: 24
  }
});
