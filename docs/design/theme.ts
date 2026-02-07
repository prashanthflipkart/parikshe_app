import tokens from "./parikshe-style-tokens.json";

type ThemeMode = "light" | "dark";

export const createTheme = (mode: ThemeMode) => {
  const colors = tokens.color[mode];

  return {
    mode,
    colors: {
      primary: colors.primary["600"],
      primaryAlt: colors.primary["500"],
      primarySoft: colors.primary["100"],
      secondary: colors.secondary["600"],
      secondarySoft: colors.secondary["100"],
      background: colors.background,
      surface: colors.surface,
      surfaceAlt: colors.surfaceAlt,
      textPrimary: colors.text.primary,
      textSecondary: colors.text.secondary,
      textMuted: colors.text.muted,
      border: colors.border,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      typeScale: tokens.typography.typeScale
    },
    spacing: tokens.spacing,
    radius: tokens.radius,
    elevation: tokens.elevation,
    icon: tokens.icon,
    components: tokens.components,
    motion: tokens.motion,
    accessibility: tokens.accessibility
  };
};

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
