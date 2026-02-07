import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getTestById, submitTest } from "../services/catalog";
import { addLocalTestAttempt } from "../services/storage";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "TestAttempt">;

type Question = {
  id: string;
  prompt: string;
  options: string[];
};

export const TestAttemptScreen = ({ navigation, route }: Props) => {
  const { testId } = route.params;
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Test");
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getTestById(testId)
      .then(data => {
        if (isMounted) {
          setTitle(data.title ?? "Test");
          setQuestions(data.questions ?? []);
          setDurationMinutes(data.durationMinutes ?? 0);
          setAnswers(new Array((data.questions ?? []).length).fill(-1));
          setTimeLeft((data.durationMinutes ?? 0) * 60);
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

  const question = questions[current];

  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && questions.length > 0 && !submitting) {
      handleSubmit();
    }
  }, [timeLeft, questions.length, submitting]);

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      const token = await getToken();
      const result = await submitTest(testId, answers, timeSpent, token);
      await addLocalTestAttempt({
        attemptId: result.attemptId ?? `local-${Date.now()}`,
        testId,
        testTitle: title,
        score: result.score ?? 0,
        total: result.total ?? questions.length,
        accuracy: result.accuracy ?? 0,
        createdAt: new Date().toISOString()
      });
    } finally {
      navigation.navigate("TestResults", { testId, answers });
    }
  };

  return (
    <Screen scroll>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator />
        ) : question ? (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.meta}>
              Q{current + 1} of {questions.length}
            </Text>
            <Text style={styles.meta}>
              Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </Text>
            <Text style={styles.prompt}>{question.prompt}</Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  selected === option && styles.optionSelected
                ]}
                onPress={() => {
                  setSelected(option);
                  setAnswers(prev => {
                    const next = [...prev];
                    next[current] = optionIndex;
                    return next;
                  });
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                if (current === questions.length - 1) {
                  handleSubmit();
                } else {
                  setSelected(null);
                  setCurrent(prev => Math.min(prev + 1, questions.length - 1));
                }
              }}
            >
              <Text style={styles.primaryButtonText}>
                {current === questions.length - 1 ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.meta}>No questions</Text>
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
    fontSize: 18,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  prompt: {
    marginTop: 12,
    fontSize: 15,
    color: lightTheme.colors.textPrimary
  },
  option: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  optionSelected: {
    borderColor: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primarySoft
  },
  optionText: {
    fontSize: 14,
    color: lightTheme.colors.textPrimary
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
  }
});
