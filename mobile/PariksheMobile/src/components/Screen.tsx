import React from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { lightTheme } from "../theme/theme";

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
};

export const Screen = ({ children, style, scroll }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const safeStyle = [
    styles.container,
    { paddingTop: insets.top * 0.25, paddingBottom: 0 },
    style
  ];
  if (scroll) {
    return (
      <SafeAreaView style={safeStyle} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={safeStyle} edges={["top"]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background
  },
  scrollContent: {}
});
