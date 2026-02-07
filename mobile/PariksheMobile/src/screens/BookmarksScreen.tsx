import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getBookmarks, removeBookmark, BookmarkItem } from "../services/storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export const BookmarksScreen = () => {
  const [items, setItems] = useState<BookmarkItem[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getBookmarks().then(setItems);
  }, []);

  const handleRemove = async (lessonId: string) => {
    const next = await removeBookmark(lessonId);
    setItems(next);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.subtitle}>Saved lessons</Text>
      </View>
      {items.length === 0 ? (
        <Text style={styles.empty}>No bookmarks yet</Text>
      ) : (
        items.map(item => (
          <View key={item.lessonId} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("LessonPlayer", { lessonId: item.lessonId })}
              >
                <Text style={styles.secondaryButtonText}>Open</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => handleRemove(item.lessonId)}
              >
                <Text style={styles.secondaryButtonText}>Remove</Text>
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
  row: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8
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
  }
});
