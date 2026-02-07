import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getLessonProgressList, LessonProgress } from "../services/storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { TouchableOpacity } from "react-native";

export const ProgressHistoryScreen = () => {
  const [items, setItems] = useState<LessonProgress[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getLessonProgressList().then(setItems);
  }, []);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Progress History</Text>
        <Text style={styles.subtitle}>Recent lessons</Text>
      </View>
      {items.length === 0 ? (
        <Text style={styles.empty}>No progress yet</Text>
      ) : (
        items.map(item => (
          <TouchableOpacity
            key={item.lessonId}
            style={styles.card}
            onPress={() => navigation.navigate("LessonPlayer", { lessonId: item.lessonId })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>
              {item.progressPercent}% • {new Date(item.updatedAt).toLocaleString()}
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
  empty: {
    marginTop: 24,
    marginHorizontal: 16,
    color: lightTheme.colors.textSecondary
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
