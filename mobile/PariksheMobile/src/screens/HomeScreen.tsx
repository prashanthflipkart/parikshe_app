import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getDiscovery } from "../services/catalog";
import {
  ContinueLearning,
  TodayPlanItem,
  getContinueLearning,
  getTodayPlan,
  setTodayPlan
} from "../services/storage";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(true);
  const [nextLive, setNextLive] = useState<{
    title: string;
    teacherName: string;
    startsAt: string;
    joinUrl?: string;
  } | null>(null);
  const [testOfDay, setTestOfDay] = useState<{
    id?: string;
    title: string;
    questionCount: number;
  } | null>(null);
  const [continueItem, setContinueItem] = useState<ContinueLearning | null>(null);
  const [planItems, setPlanItems] = useState<TodayPlanItem[]>([]);
  const [planTitle, setPlanTitle] = useState("");
  const [planMinutes, setPlanMinutes] = useState("");
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const bannerScrollRef = useRef<ScrollView | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const banners = [
    {
      id: "banner-1",
      title: "Daily Tests",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "banner-2",
      title: "Live Classes",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "banner-3",
      title: "Revision Notes",
      image:
        "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=1200&auto=format&fit=crop"
    }
  ];
  const bannerItems = useMemo(() => [...banners, ...banners], [banners]);
  const bannerCardWidth = 260;
  const bannerGap = 12;
  const bannerSnap = bannerCardWidth + bannerGap;
  const bannerSidePadding = Math.max(0, (screenWidth - bannerCardWidth) / 2);

  useEffect(() => {
    if (!bannerSnap || bannerItems.length === 0) {
      return;
    }
    const timer = setInterval(() => {
      setBannerIndex(prev => {
        const next = prev + 1;
        if (next >= bannerItems.length) {
          bannerScrollRef.current?.scrollTo({ x: 0, animated: false });
          return 0;
        }
        bannerScrollRef.current?.scrollTo({ x: next * bannerSnap, animated: true });
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [bannerItems.length, bannerSnap]);

  useEffect(() => {
    let isMounted = true;

    getDiscovery()
      .then(data => {
        if (!isMounted) {
          return;
        }
        setNextLive(data.nextLive ?? null);
        setTestOfDay(data.testOfDay ?? null);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    getContinueLearning().then(item => {
      if (isMounted) {
        setContinueItem(item ?? null);
      }
    });

    getTodayPlan().then(items => {
      if (isMounted) {
        setPlanItems(items);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getContinueLearning().then(item => {
        if (isActive) {
          setContinueItem(item ?? null);
        }
      });
      getTodayPlan().then(items => {
        if (isActive) {
          setPlanItems(items);
        }
      });
      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    setTodayPlan(planItems);
  }, [planItems]);

  const planStats = useMemo(() => {
    const totalMinutes = planItems.reduce((sum, item) => sum + item.minutes, 0);
    const pendingCount = planItems.filter(item => !item.done).length;
    return { totalMinutes, pendingCount };
  }, [planItems]);

  const handleAddPlanItem = () => {
    const minutes = Number(planMinutes);
    if (!planTitle.trim() || Number.isNaN(minutes) || minutes <= 0) {
      return;
    }
    const next: TodayPlanItem = {
      id: `plan-${Date.now()}`,
      title: planTitle.trim(),
      minutes,
      done: false
    };
    setPlanItems(prev => [next, ...prev]);
    setPlanTitle("");
    setPlanMinutes("");
  };

  const navigateToTab = (tabName: "Home" | "Learn" | "Live" | "Test" | "Profile") => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate(tabName as never);
    }
  };

  const navigateToTabScreen = (
    tabName: "Home" | "Learn" | "Live" | "Test" | "Profile",
    screen: string,
    params?: Record<string, unknown>
  ) => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate(tabName as never, { screen, params } as never);
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Home</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Text style={styles.headerIcon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <Text style={styles.headerIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>Today’s Plan / ಇಂದಿನ ಯೋಜನೆ</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView
          ref={bannerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={bannerSnap}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={[
            styles.bannerRow,
            { paddingHorizontal: bannerSidePadding }
          ]}
        >
          {bannerItems.map((banner, index) => (
            <View key={`${banner.id}-${index}`} style={styles.heroCard}>
              <Image source={{ uri: banner.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>{banner.title}</Text>
                <Text style={styles.heroMeta}>Tap to explore</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Learn in Kannada + English</Text>
          <Text style={styles.bannerMeta}>Topic-wise videos • Notes • PYQs</Text>
        </View>

        <View style={styles.loveCard}>
          <Text style={styles.loveTitle}>For Ritu ❤️</Text>
          <Text style={styles.loveText}>
            This Valentine’s I want to gift you this app and make this app a success. We
            will do it together. I love you baby — my Ritu ussh, Mrs. Ritika Prashanth
            Rapelli.
          </Text>
        </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBubble}>
            <Text style={styles.iconText}>▶️</Text>
          </View>
          <Text style={styles.cardTitle}>Continue Learning</Text>
        </View>
        <Text style={styles.cardMeta}>
          {continueItem
            ? `${continueItem.title} • ${continueItem.progressPercent}%`
            : "Start a lesson to see progress"}
        </Text>
        {continueItem && (
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, continueItem.progressPercent)}%` }
              ]}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            continueItem
              ? navigateToTabScreen("Learn", "LessonPlayer", {
                  lessonId: continueItem.lessonId
                })
              : navigateToTab("Learn")
          }
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBubble}>
            <Text style={styles.iconText}>🗓️</Text>
          </View>
          <Text style={styles.cardTitle}>Today’s Plan</Text>
        </View>
        <Text style={styles.cardMeta}>
          {planItems.length > 0
            ? `${planStats.pendingCount} tasks • ${planStats.totalMinutes} mins`
            : "No plan yet"}
        </Text>
        {isEditingPlan ? (
          <>
            <View style={styles.planInputRow}>
              <TextInput
                value={planTitle}
                onChangeText={setPlanTitle}
                placeholder="Task name"
                placeholderTextColor={lightTheme.colors.textMuted}
                style={styles.planInput}
              />
              <TextInput
                value={planMinutes}
                onChangeText={setPlanMinutes}
                placeholder="Mins"
                placeholderTextColor={lightTheme.colors.textMuted}
                keyboardType="number-pad"
                style={[styles.planInput, styles.planInputSmall]}
              />
            </View>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleAddPlanItem}>
              <Text style={styles.secondaryButtonText}>Add task</Text>
            </TouchableOpacity>
            {planItems.map(item => (
              <View key={item.id} style={styles.planRow}>
                <TouchableOpacity
                  style={[styles.planToggle, item.done && styles.planToggleDone]}
                  onPress={() =>
                    setPlanItems(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, done: !entry.done } : entry
                      )
                    )
                  }
                >
                  <Text style={styles.planToggleText}>{item.done ? "✓" : "•"}</Text>
                </TouchableOpacity>
                <View style={styles.planTextWrap}>
                  <Text
                    style={[styles.planText, item.done && styles.planTextDone]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.planMeta}>{item.minutes} mins</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setPlanItems(prev => prev.filter(entry => entry.id !== item.id))
                  }
                >
                  <Text style={styles.planRemove}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setIsEditingPlan(false)}
            >
              <Text style={styles.primaryButtonText}>Done</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {planItems.slice(0, 3).map(item => (
              <View key={item.id} style={styles.planPreviewRow}>
                <Text style={styles.planPreviewText}>
                  {item.done ? "✓" : "•"} {item.title} • {item.minutes} mins
                </Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setIsEditingPlan(true)}
            >
              <Text style={styles.secondaryButtonText}>Edit plan</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBubble}>
            <Text style={styles.iconText}>🔴</Text>
          </View>
          <Text style={styles.cardTitle}>Next Live Class</Text>
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <>
            <Text style={styles.cardMeta}>
              {nextLive
                ? `${new Date(nextLive.startsAt).toLocaleString()} • ${nextLive.title}`
                : "No upcoming live classes"}
            </Text>
            {nextLive?.teacherName ? (
              <Text style={styles.cardMeta}>Host: {nextLive.teacherName}</Text>
            ) : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  if (nextLive?.joinUrl) {
                    Linking.openURL(nextLive.joinUrl);
                  } else {
                    navigateToTab("Live");
                  }
                }}
              >
                <Text style={styles.primaryButtonText}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Notify me</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBubble}>
            <Text style={styles.iconText}>📝</Text>
          </View>
          <Text style={styles.cardTitle}>Test of the Day</Text>
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <>
            <Text style={styles.cardMeta}>
              {testOfDay
                ? `${testOfDay.title} • ${testOfDay.questionCount} Qs`
                : "No tests available"}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() =>
                testOfDay?.id
                  ? navigateToTabScreen("Test", "TestDetail", { testId: testOfDay.id })
                  : navigateToTab("Test")
              }
            >
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBubble}>
            <Text style={styles.iconText}>⭐</Text>
          </View>
          <Text style={styles.cardTitle}>Upgrade</Text>
        </View>
        <Text style={styles.cardMeta}>Unlock full access for PU2 Science</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("ProductListing")}
        >
          <Text style={styles.primaryButtonText}>View plans</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: lightTheme.colors.background
  },
  content: {
    paddingBottom: 16
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerActions: {
    flexDirection: "row",
    gap: 8
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: lightTheme.colors.textMuted
  },
  banner: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: lightTheme.colors.primarySoft,
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  bannerRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12
  },
  heroCard: {
    width: 260,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: lightTheme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  heroImage: {
    width: "100%",
    height: "100%"
  },
  heroOverlay: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  heroMeta: {
    marginTop: 2,
    fontSize: 11,
    color: "#FFFFFF"
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  bannerMeta: {
    marginTop: 6,
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  loveCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: lightTheme.colors.primarySoft,
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  loveTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  loveText: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary,
    lineHeight: 18
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  iconBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: lightTheme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  iconText: {
    fontSize: 14
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  buttonRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10
  },
  primaryButton: {
    flex: 1,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: lightTheme.colors.textPrimary,
    fontWeight: "600"
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
  },
  loader: {
    marginTop: 12
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: lightTheme.colors.surfaceAlt,
    marginTop: 8,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: lightTheme.colors.primary
  },
  planInputRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8
  },
  planInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: lightTheme.colors.textPrimary,
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  planInputSmall: {
    maxWidth: 90,
    textAlign: "center"
  },
  planRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  planToggle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightTheme.colors.surfaceAlt
  },
  planToggleDone: {
    borderColor: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primarySoft
  },
  planToggleText: {
    fontSize: 12,
    color: lightTheme.colors.textPrimary
  },
  planTextWrap: {
    flex: 1
  },
  planText: {
    fontSize: 14,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  planTextDone: {
    textDecorationLine: "line-through",
    color: lightTheme.colors.textMuted
  },
  planMeta: {
    marginTop: 2,
    fontSize: 12,
    color: lightTheme.colors.textSecondary
  },
  planRemove: {
    fontSize: 12,
    color: lightTheme.colors.textMuted
  },
  planPreviewRow: {
    marginTop: 8
  },
  planPreviewText: {
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  }
});
