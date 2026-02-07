import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTestById } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "TestResults">;

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

export const TestResultsScreen = ({ navigation, route }: Props) => {
  const { testId, answers } = route.params;
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    let isMounted = true;
    getTestById(testId)
      .then(data => {
        if (!isMounted) {
          return;
        }
        const questions = (data.questions ?? []) as Question[];
        setQuestions(questions);
        const computedTotal = questions.length;
        let correct = 0;
        questions.forEach((q, idx) => {
          if (answers[idx] === q.correctIndex) {
            correct += 1;
          }
        });
        setScore(correct);
        setTotal(computedTotal);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [testId, answers]);

  return (
    <Screen>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.meta}>
              Score: {score}/{total}
            </Text>
            <Text style={styles.meta}>
              Accuracy: {total > 0 ? Math.round((score / total) * 100) : 0}%
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("TestSolutions", { testId })}
            >
              <Text style={styles.primaryButtonText}>View solutions</Text>
            </TouchableOpacity>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Review answers</Text>
              {questions.map((q, idx) => {
                const selectedIndex = answers[idx];
                const isCorrect = selectedIndex === q.correctIndex;
                const selectedLabel =
                  selectedIndex >= 0 ? q.options[selectedIndex] : "Not answered";
                const correctLabel = q.options[q.correctIndex];
                return (
                  <View key={`${q.prompt}-${idx}`} style={styles.answerCard}>
                    <Text style={styles.answerTitle}>
                      Q{idx + 1}. {q.prompt}
                    </Text>
                    <Text style={[styles.answerMeta, isCorrect && styles.answerCorrect]}>
                      Your answer: {selectedLabel}
                    </Text>
                    {!isCorrect && (
                      <Text style={[styles.answerMeta, styles.answerIncorrect]}>
                        Correct: {correctLabel}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.surface,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.border,
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: lightTheme.colors.textSecondary
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  },
  section: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  answerCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  answerTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  answerMeta: {
    marginTop: 6,
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  answerCorrect: {
    color: lightTheme.colors.success
  },
  answerIncorrect: {
    color: lightTheme.colors.error
  }
});
