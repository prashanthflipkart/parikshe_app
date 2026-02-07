import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getCategories } from "../services/catalog";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { studyVideos } from "../data/studyVideos";

type Category = {
  id: string;
  name: string;
};

export const LearnScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChip, setActiveChip] = useState<"map" | "downloads" | "bookmarks">("map");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const featured = studyVideos.slice(0, 5);
  const progressByIndex = useMemo(() => [42, 30, 12, 25, 18], []);

  useEffect(() => {
    let isMounted = true;
    getCategories()
      .then(data => {
        if (isMounted) {
          setCategories(data.categories ?? []);
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
          <Text style={styles.title}>Learn</Text>
          <TouchableOpacity style={styles.headerIconButton}>
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Syllabus map • Topic-wise videos</Text>
      </View>
      <View style={styles.chipRow}>
        <TouchableOpacity
          style={[styles.chip, activeChip === "map" && styles.chipActive]}
          onPress={() => setActiveChip("map")}
        >
          <Text style={[styles.chipText, activeChip === "map" && styles.chipTextActive]}>
            Syllabus map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, activeChip === "downloads" && styles.chipActive]}
          onPress={() => {
            setActiveChip("downloads");
            navigation.navigate("Downloads");
          }}
        >
          <Text style={[styles.chipText, activeChip === "downloads" && styles.chipTextActive]}>
            Downloads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, activeChip === "bookmarks" && styles.chipActive]}
          onPress={() => {
            setActiveChip("bookmarks");
            navigation.navigate("Bookmarks");
          }}
        >
          <Text style={[styles.chipText, activeChip === "bookmarks" && styles.chipTextActive]}>
            Bookmarks
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featuredCard}>
        <Text style={styles.cardTitle}>Featured Videos</Text>
        <Text style={styles.cardMeta}>SSLC @ Parikshe • {featured.length} videos</Text>
        {featured.map(video => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoRow}
            onPress={() =>
              navigation.navigate("SubjectVideos", {
                subjectName: video.subjectName,
                videoId: video.id
              })
            }
          >
            <View style={styles.thumbWrap}>
              <Image source={{ uri: video.thumbnailUrl }} style={styles.thumb} />
            </View>
            <View style={styles.videoText}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.cardMeta}>{video.subjectName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("SubjectList", {
                categoryId: category.id,
                categoryName: category.name
              })
            }
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>📘 {category.name}</Text>
              <View style={styles.progressPill}>
                <Text style={styles.progressText}>{progressByIndex[index] ?? 0}%</Text>
              </View>
            </View>
            <Text style={styles.cardMeta}>Subjects • Videos • Notes</Text>
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
  chipRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4
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
  featuredCard: {
    backgroundColor: lightTheme.colors.surfaceAlt,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.primarySoft,
    borderWidth: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  progressPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  progressText: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
  thumbWrap: {
    width: 96,
    height: 54,
    borderRadius: 8,
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  thumb: {
    width: 96,
    height: 54,
    borderRadius: 8,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  videoText: {
    marginLeft: 12,
    flex: 1
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  loader: {
    marginTop: 24
  }
});
