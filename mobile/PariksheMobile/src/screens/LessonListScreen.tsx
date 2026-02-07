import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getLessons } from "../services/catalog";
import { getLessonProgressMap } from "../services/storage";

type Props = NativeStackScreenProps<RootStackParamList, "LessonList">;

type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
  isFree: boolean;
};

export const LessonListScreen = ({ navigation, route }: Props) => {
  const { topicId, topicName } = route.params;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, { progressPercent: number }>>({});

  useEffect(() => {
    let isMounted = true;
    Promise.all([getLessons(topicId), getLessonProgressMap()])
      .then(([data, progress]) => {
        if (isMounted) {
          setLessons(data.lessons ?? []);
          setProgressMap(progress ?? {});
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
  }, [topicId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{topicName}</Text>
        <Text style={styles.subtitle}>Lessons</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        lessons.map(lesson => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.card}
            onPress={() => navigation.navigate("LessonPlayer", { lessonId: lesson.id })}
          >
            <Text style={styles.cardTitle}>{lesson.title}</Text>
            <Text style={styles.cardMeta}>
              {lesson.durationMinutes} mins • {lesson.isFree ? "Free" : "Paid"} •{" "}
              {progressMap[lesson.id]?.progressPercent ?? 0}%
            </Text>
          </TouchableOpacity>
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
    marginTop: 24
  }
});
