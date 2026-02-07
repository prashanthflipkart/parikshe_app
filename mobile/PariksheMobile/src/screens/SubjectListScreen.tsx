import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getSubjects } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "SubjectList">;

type Subject = {
  id: string;
  name: string;
};

export const SubjectListScreen = ({ navigation, route }: Props) => {
  const { categoryId, categoryName } = route.params;
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getSubjects(categoryId)
      .then(data => {
        if (isMounted) {
          setSubjects(data.subjects ?? []);
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
  }, [categoryId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{categoryName} 🎓</Text>
        <Text style={styles.subtitle}>Subjects • Pick a path</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        subjects.map(subject => (
          <TouchableOpacity
            key={subject.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ChapterList", {
                subjectId: subject.id,
                subjectName: subject.name
              })
            }
          >
            <Text style={styles.cardTitle}>📘 {subject.name}</Text>
            <Text style={styles.cardMeta}>Chapters • Videos • Notes</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("ChapterList", {
                    subjectId: subject.id,
                    subjectName: subject.name
                  })
                }
              >
                <Text style={styles.actionText}>📖 Chapters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("SubjectVideos", {
                    subjectId: subject.id,
                    subjectName: subject.name
                  })
                }
              >
                <Text style={styles.actionText}>▶️ Videos</Text>
              </TouchableOpacity>
            </View>
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
  actionRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    alignItems: "center",
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  loader: {
    marginTop: 24
  }
});
