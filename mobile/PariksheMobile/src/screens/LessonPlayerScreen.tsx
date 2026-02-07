import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import RNFS from "react-native-fs";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getLessonById } from "../services/catalog";
import { fetchRelatedVideos } from "../services/media";
import {
  getBookmarks,
  toggleBookmark,
  addDownload,
  setContinueLearning,
  setLessonProgress
} from "../services/storage";

type Props = NativeStackScreenProps<RootStackParamList, "LessonPlayer">;

type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
  isFree: boolean;
  videoUrl?: string;
  notesUrl?: string;
};

type RelatedVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

export const LessonPlayerScreen = ({ navigation, route }: Props) => {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<RelatedVideo[]>([]);
  const [overrideUrl, setOverrideUrl] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const playerRef = useRef<any>(null);
  const videoId = useMemo(() => {
    const url = overrideUrl ?? lesson?.videoUrl ?? "";
    if (!url) {
      return null;
    }
    const match = url.match(/[?&]v=([^&]+)/);
    if (match?.[1]) {
      return match[1];
    }
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    return shortMatch?.[1] ?? null;
  }, [lesson?.videoUrl, overrideUrl]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getLessonById(lessonId), fetchRelatedVideos()])
      .then(([lessonData, relatedData]) => {
        if (isMounted) {
          setLesson(lessonData.lesson ?? null);
          setRelated(relatedData.videos ?? []);
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
  }, [lessonId]);

  useEffect(() => {
    if (!lesson) {
      return;
    }
    setContinueLearning({
      lessonId: lesson.id,
      title: lesson.title,
      progressPercent,
      updatedAt: new Date().toISOString()
    });
    setLessonProgress({
      lessonId: lesson.id,
      title: lesson.title,
      progressPercent,
      updatedAt: new Date().toISOString()
    });
  }, [lesson, progressPercent]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying) {
      intervalId = setInterval(async () => {
        try {
          const current = await playerRef.current?.getCurrentTime?.();
          const duration = await playerRef.current?.getDuration?.();
          if (typeof current === "number" && typeof duration === "number" && duration > 0) {
            const percent = Math.min(100, Math.round((current / duration) * 100));
            setProgressPercent(percent);
          }
        } catch {
          // ignore player read errors
        }
      }, 2000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    let isMounted = true;
    getBookmarks().then(items => {
      if (isMounted) {
        setBookmarked(items.some(item => item.lessonId === lessonId));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  const handleBookmark = async () => {
    if (!lesson) {
      return;
    }
    const next = await toggleBookmark({ lessonId: lesson.id, title: lesson.title });
    setBookmarked(next);
  };

  const handleDownload = async () => {
    if (!lesson?.videoUrl) {
      Alert.alert("No video URL");
      return;
    }
    if (lesson.videoUrl.includes("youtube.com") || lesson.videoUrl.includes("youtu.be")) {
      Alert.alert("Downloads not available for YouTube videos");
      return;
    }
    if (downloading) {
      return;
    }

    setDownloading(true);
    const fileName = `lesson-${lesson.id}.mp4`;
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const result = await RNFS.downloadFile({
        fromUrl: lesson.videoUrl,
        toFile: localPath
      }).promise;
      if (result.statusCode === 200) {
        await addDownload({
          lessonId: lesson.id,
          title: lesson.title,
          url: lesson.videoUrl,
          localPath,
          createdAt: new Date().toISOString()
        });
        Alert.alert("Downloaded", "Saved to device");
      } else {
        Alert.alert("Download failed");
      }
    } catch {
      Alert.alert("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{lesson?.title ?? "Lesson"}</Text>
        <Text style={styles.subtitle}>
          {lesson?.durationMinutes ?? 0} mins • {lesson?.isFree ? "Free" : "Paid"} •{" "}
          {progressPercent}% watched
        </Text>
      </View>
      <View style={styles.player}>
        {loading ? (
          <ActivityIndicator />
        ) : videoId ? (
          <YoutubePlayer
            ref={playerRef}
            height={200}
            play={false}
            videoId={videoId}
            onChangeState={state => setIsPlaying(state === "playing")}
          />
        ) : (
          <Text style={styles.playerText}>Video not available</Text>
        )}
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, bookmarked && styles.actionActive]}
          onPress={handleBookmark}
        >
          <Text style={styles.actionText}>{bookmarked ? "Bookmarked" : "Bookmark"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDownload}
        >
          <Text style={styles.actionText}>{downloading ? "Downloading..." : "Download"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("NotesViewer", {
              title: lesson?.title,
              notesUrl: lesson?.notesUrl
            })
          }
        >
          <Text style={styles.actionText}>Notes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notes</Text>
        <Text style={styles.cardMeta}>{lesson?.notesUrl ?? "No notes available"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Related from Parikshe SSLC</Text>
        {related.length === 0 ? (
          <Text style={styles.cardMeta}>No related videos</Text>
        ) : (
          related.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.relatedRow}
              onPress={() => setOverrideUrl(video.url)}
            >
              <Image source={{ uri: video.thumbnail }} style={styles.thumb} />
              <View style={styles.relatedText}>
                <Text style={styles.relatedTitle}>{video.title}</Text>
                <Text style={styles.cardMeta}>Tap to play</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
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
  player: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 200,
    backgroundColor: lightTheme.colors.surfaceAlt,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  playerText: {
    color: lightTheme.colors.textSecondary
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    alignItems: "center"
  },
  actionActive: {
    borderColor: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primarySoft
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: lightTheme.colors.primary
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
  relatedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
  thumb: {
    width: 80,
    height: 48,
    borderRadius: 8,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  relatedText: {
    marginLeft: 12,
    flex: 1
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  }
});
