import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import RNFS from "react-native-fs";
import { getDownloads, removeDownload, DownloadItem } from "../services/storage";

export const DownloadsScreen = () => {
  const [items, setItems] = useState<DownloadItem[]>([]);

  useEffect(() => {
    getDownloads().then(setItems);
  }, []);

  const handleOpen = async (item: DownloadItem) => {
    const exists = await RNFS.exists(item.localPath);
    if (!exists) {
      Alert.alert("File not found");
      return;
    }
    await RNFS.openFile(item.localPath);
  };

  const handleDelete = async (item: DownloadItem) => {
    const exists = await RNFS.exists(item.localPath);
    if (exists) {
      await RNFS.unlink(item.localPath);
    }
    const next = await removeDownload(item.lessonId);
    setItems(next);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Downloads</Text>
        <Text style={styles.subtitle}>Saved lessons</Text>
      </View>
      {items.length === 0 ? (
        <Text style={styles.empty}>No downloads yet</Text>
      ) : (
        items.map(item => (
          <View key={item.lessonId} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.localPath}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => handleOpen(item)}>
                <Text style={styles.secondaryButtonText}>Open</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => handleDelete(item)}>
                <Text style={styles.secondaryButtonText}>Delete</Text>
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
  cardMeta: {
    marginTop: 6,
    fontSize: 12,
    color: lightTheme.colors.textSecondary
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
