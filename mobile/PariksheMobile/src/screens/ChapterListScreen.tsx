import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getChapters } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "ChapterList">;

type Chapter = {
  id: string;
  name: string;
};

export const ChapterListScreen = ({ navigation, route }: Props) => {
  const { subjectId, subjectName } = route.params;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getChapters(subjectId)
      .then(data => {
        if (isMounted) {
          setChapters(data.chapters ?? []);
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
  }, [subjectId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{subjectName}</Text>
        <Text style={styles.subtitle}>Chapters</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        chapters.map(chapter => (
          <TouchableOpacity
            key={chapter.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("TopicList", {
                chapterId: chapter.id,
                chapterName: chapter.name
              })
            }
          >
            <Text style={styles.cardTitle}>{chapter.name}</Text>
            <Text style={styles.cardMeta}>View topics</Text>
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
