import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTopics } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "TopicList">;

type Topic = {
  id: string;
  name: string;
};

export const TopicListScreen = ({ navigation, route }: Props) => {
  const { chapterId, chapterName } = route.params;
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTopics(chapterId)
      .then(data => {
        if (isMounted) {
          setTopics(data.topics ?? []);
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
  }, [chapterId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{chapterName}</Text>
        <Text style={styles.subtitle}>Topics</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        topics.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("LessonList", {
                topicId: topic.id,
                topicName: topic.name
              })
            }
          >
            <Text style={styles.cardTitle}>{topic.name}</Text>
            <Text style={styles.cardMeta}>View lessons</Text>
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
