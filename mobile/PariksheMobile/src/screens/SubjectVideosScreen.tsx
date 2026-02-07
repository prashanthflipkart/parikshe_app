import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StudyVideo, studyVideos } from "../data/studyVideos";

type Props = NativeStackScreenProps<RootStackParamList, "SubjectVideos">;

const getYouTubeId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  if (match?.[1]) {
    return match[1];
  }
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  return shortMatch?.[1] ?? null;
};

export const SubjectVideosScreen = ({ route }: Props) => {
  const { subjectId, subjectName, videoId } = route.params;
  const [selected, setSelected] = useState<StudyVideo | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [useWebView, setUseWebView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = useMemo(() => {
    if (subjectId) {
      const filtered = studyVideos.filter(video => video.subjectId === subjectId);
      return filtered.length > 0 ? filtered : studyVideos;
    }
    const byName = studyVideos.filter(
      video => video.subjectName.toLowerCase() === subjectName.toLowerCase()
    );
    return byName.length > 0 ? byName : studyVideos;
  }, [subjectId, subjectName]);

  const activeId = selected ? getYouTubeId(selected.youtubeUrl) : null;
  const watchUrl = activeId
    ? `https://m.youtube.com/watch?v=${activeId}&playsinline=1`
    : null;

  useEffect(() => {
    if (videoId) {
      const match = videos.find(video => video.id === videoId);
      if (match) {
        setSelected(match);
      }
    }
  }, [videoId, videos]);


  useEffect(() => {
    if (!selected && videos.length > 0) {
      setSelected(videos[0]);
    }
  }, [selected, videos]);

  useEffect(() => {
    setLoadError(false);
    setUseWebView(false);
    if (activeId) {
      setIsPlaying(true);
    }
  }, [activeId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{subjectName} ▶️</Text>
        <Text style={styles.subtitle}>Topic-wise videos • Native YouTube</Text>
      </View>
      <View style={styles.player}>
        {activeId && !useWebView ? (
          <YoutubePlayer
            height={200}
            width="100%"
            play={isPlaying}
            videoId={activeId}
            onChangeState={state => {
              if (state === "ended") {
                setIsPlaying(false);
              }
            }}
            onError={() => {
              setUseWebView(true);
              setLoadError(false);
            }}
          />
        ) : watchUrl ? (
          <View style={styles.playerInner}>
            <WebView
              key={activeId ?? "player"}
              source={{ uri: watchUrl }}
              javaScriptEnabled
              allowsFullscreenVideo
              domStorageEnabled
              mediaPlaybackRequiresUserAction={false}
              originWhitelist={["*"]}
              mixedContentMode="always"
              thirdPartyCookiesEnabled
              userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
              onError={() => setLoadError(true)}
              onHttpError={() => setLoadError(true)}
              style={styles.webView}
            />
            {loadError && (
              <View style={styles.errorOverlay}>
                <Text style={styles.errorText}>Video failed to load</Text>
                <Text style={styles.errorHint}>Try another video</Text>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.playerText}>Select a video to play</Text>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎬 Videos</Text>
        {videos.length === 0 ? (
          <Text style={styles.cardMeta}>No videos yet for this subject.</Text>
        ) : (
          videos.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoRow}
              onPress={() => {
                setSelected(video);
              }}
            >
              <Image source={{ uri: video.thumbnailUrl }} style={styles.thumb} />
              <View style={styles.videoText}>
                <Text style={styles.videoTitle}>{video.title}</Text>
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
  playerInner: {
    width: "100%",
    height: 200
  },
  webView: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  playerText: {
    color: lightTheme.colors.textSecondary
  },
  errorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)"
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  errorHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#FFFFFF"
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
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
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
  }
});
