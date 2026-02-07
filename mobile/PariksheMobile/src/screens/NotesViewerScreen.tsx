import React from "react";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "NotesViewer">;

export const NotesViewerScreen = ({ route }: Props) => {
  const { notesUrl, title } = route.params;

  const handleOpen = async () => {
    if (!notesUrl) {
      Alert.alert("Notes not available");
      return;
    }

    const canOpen = await Linking.canOpenURL(notesUrl);
    if (canOpen) {
      await Linking.openURL(notesUrl);
    } else {
      Alert.alert("Cannot open notes");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{title ?? "Notes"}</Text>
        <Text style={styles.meta}>{notesUrl ?? "No notes URL available"}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleOpen}>
          <Text style={styles.primaryButtonText}>Open notes</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  meta: {
    marginTop: 8,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
