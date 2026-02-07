import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTestById } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "TestSolutions">;

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const TestSolutionsScreen = ({ route }: Props) => {
  const { testId } = route.params;
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    let isMounted = true;
    getTestById(testId)
      .then(data => {
        if (isMounted) {
          setQuestions(data.questions ?? []);
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
  }, [testId]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Solutions</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        questions.map((q, idx) => (
          <View key={`${q.prompt}-${idx}`} style={styles.card}>
            <Text style={styles.cardTitle}>
              Q{idx + 1}. {q.prompt}
            </Text>
            <Text style={styles.cardMeta}>
              Correct: {q.options[q.correctIndex]}
            </Text>
            <Text style={styles.cardMeta}>{q.explanation ?? "No explanation"}</Text>
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
  loader: {
    marginTop: 24
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
    fontSize: 14,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  }
});
