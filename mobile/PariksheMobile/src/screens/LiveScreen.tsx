import React, { useMemo, useState, useEffect } from "react";
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getLiveClasses } from "../services/catalog";

export const LiveScreen = () => {
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState<
    { id: string; title: string; teacherName: string; startsAt: string; joinUrl?: string }[]
  >([]);
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "today" | "past" | "recordings">(
    "upcoming"
  );

  useEffect(() => {
    let isMounted = true;
    getLiveClasses()
      .then(data => {
        if (isMounted) {
          setLives(data.liveClasses ?? []);
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

  const displayLives = useMemo(() => {
    if (lives.length > 0) {
      return lives;
    }
    return [
      {
        id: "sample-live-1",
        title: "Refraction • Physics",
        teacherName: "Ravi sir",
        startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        joinUrl: "https://meet.google.com"
      },
      {
        id: "sample-live-2",
        title: "Acids • Chemistry",
        teacherName: "Asha ma'am",
        startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }, [lives]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Live</Text>
        <Text style={styles.subtitle}>Upcoming classes</Text>
      </View>
      <View style={styles.chipRow}>
        {[
          { key: "upcoming", label: "Upcoming" },
          { key: "today", label: "Today" },
          { key: "past", label: "Past" },
          { key: "recordings", label: "Recordings" }
        ].map(item => (
          <TouchableOpacity
            key={item.key}
            style={[styles.chip, activeFilter === item.key && styles.chipActive]}
            onPress={() => setActiveFilter(item.key as typeof activeFilter)}
          >
            <Text style={[styles.chipText, activeFilter === item.key && styles.chipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        displayLives.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>
              {new Date(item.startsAt).toLocaleString()} • {item.teacherName}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  if (item.joinUrl) {
                    Linking.openURL(item.joinUrl);
                  }
                }}
              >
                <Text style={styles.primaryButtonText}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Notify me</Text>
              </TouchableOpacity>
            </View>
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
  chipRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4,
    flexWrap: "wrap"
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  chipActive: {
    borderColor: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primarySoft
  },
  chipText: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  chipTextActive: {
    color: lightTheme.colors.textPrimary,
    fontWeight: "600"
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
  buttonRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10
  },
  primaryButton: {
    flex: 1,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: lightTheme.colors.textPrimary,
    fontWeight: "600"
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: lightTheme.colors.surfaceAlt,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  },
  loader: {
    marginTop: 24
  }
});
