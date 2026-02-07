import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { LearnScreen } from "../screens/LearnScreen";
import { LiveScreen } from "../screens/LiveScreen";
import { TestScreen } from "../screens/TestScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProductListingScreen } from "../screens/ProductListingScreen";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { PurchaseSuccessScreen } from "../screens/PurchaseSuccessScreen";
import { SubjectListScreen } from "../screens/SubjectListScreen";
import { SubjectVideosScreen } from "../screens/SubjectVideosScreen";
import { ChapterListScreen } from "../screens/ChapterListScreen";
import { TopicListScreen } from "../screens/TopicListScreen";
import { LessonListScreen } from "../screens/LessonListScreen";
import { LessonPlayerScreen } from "../screens/LessonPlayerScreen";
import { NotesViewerScreen } from "../screens/NotesViewerScreen";
import { AnalyticsScreen } from "../screens/AnalyticsScreen";
import { DownloadsScreen } from "../screens/DownloadsScreen";
import { BookmarksScreen } from "../screens/BookmarksScreen";
import { ProgressHistoryScreen } from "../screens/ProgressHistoryScreen";
import { TestDetailScreen } from "../screens/TestDetailScreen";
import { TestAttemptScreen } from "../screens/TestAttemptScreen";
import { TestResultsScreen } from "../screens/TestResultsScreen";
import { TestSolutionsScreen } from "../screens/TestSolutionsScreen";
import { TestHistoryScreen } from "../screens/TestHistoryScreen";
import { PurchaseHistoryScreen } from "../screens/PurchaseHistoryScreen";
import { ReceiptScreen } from "../screens/ReceiptScreen";
import { CouponsReferralScreen } from "../screens/CouponsReferralScreen";
import { HelpSupportScreen } from "../screens/HelpSupportScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { OtpScreen } from "../screens/OtpScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { useAuth } from "../context/AuthContext";
import { lightTheme } from "../theme/theme";

export type RootStackParamList = {
  Tabs: undefined;
  ProductListing: undefined;
  ProductDetail: { productId: string };
  Checkout: { productId: string };
  PurchaseSuccess: { productId: string };
  SubjectList: { categoryId: string; categoryName: string };
  SubjectVideos: { subjectId?: string; subjectName: string; videoId?: string };
  ChapterList: { subjectId: string; subjectName: string };
  TopicList: { chapterId: string; chapterName: string };
  LessonList: { topicId: string; topicName: string };
  LessonPlayer: { lessonId: string };
  NotesViewer: { title?: string; notesUrl?: string };
  Analytics: undefined;
  Downloads: undefined;
  Bookmarks: undefined;
  ProgressHistory: undefined;
  TestDetail: { testId: string };
  TestAttempt: { testId: string };
  TestResults: { testId: string; answers: number[] };
  TestSolutions: { testId: string };
  TestHistory: undefined;
  PurchaseHistory: undefined;
  Receipt: { purchaseId: string };
  CouponsReferral: undefined;
  HelpSupport: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Otp: { phone: string };
  Onboarding: { phone: string; otp: string };
};

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator<RootStackParamList>();
const LearnStack = createNativeStackNavigator<RootStackParamList>();
const LiveStack = createNativeStackNavigator<RootStackParamList>();
const TestStack = createNativeStackNavigator<RootStackParamList>();
const ProfileStack = createNativeStackNavigator<RootStackParamList>();
const BuyStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const tabLabels: Record<string, string> = {
  Home: "H",
  Learn: "L",
  Live: "●",
  Test: "T",
  Buy: "₹",
  Profile: "P"
};

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Tabs" component={HomeScreen} />
    <HomeStack.Screen name="ProductListing" component={ProductListingScreen} />
    <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <HomeStack.Screen name="Checkout" component={CheckoutScreen} />
    <HomeStack.Screen name="PurchaseSuccess" component={PurchaseSuccessScreen} />
  </HomeStack.Navigator>
);

const LearnStackScreen = () => (
  <LearnStack.Navigator screenOptions={{ headerShown: false }}>
    <LearnStack.Screen name="Tabs" component={LearnScreen} />
    <LearnStack.Screen name="SubjectList" component={SubjectListScreen} />
    <LearnStack.Screen name="SubjectVideos" component={SubjectVideosScreen} />
    <LearnStack.Screen name="ChapterList" component={ChapterListScreen} />
    <LearnStack.Screen name="TopicList" component={TopicListScreen} />
    <LearnStack.Screen name="LessonList" component={LessonListScreen} />
    <LearnStack.Screen name="LessonPlayer" component={LessonPlayerScreen} />
    <LearnStack.Screen name="NotesViewer" component={NotesViewerScreen} />
    <LearnStack.Screen name="Downloads" component={DownloadsScreen} />
    <LearnStack.Screen name="Bookmarks" component={BookmarksScreen} />
  </LearnStack.Navigator>
);

const LiveStackScreen = () => (
  <LiveStack.Navigator screenOptions={{ headerShown: false }}>
    <LiveStack.Screen name="Tabs" component={LiveScreen} />
  </LiveStack.Navigator>
);

const TestStackScreen = () => (
  <TestStack.Navigator screenOptions={{ headerShown: false }}>
    <TestStack.Screen name="Tabs" component={TestScreen} />
    <TestStack.Screen name="TestDetail" component={TestDetailScreen} />
    <TestStack.Screen name="TestAttempt" component={TestAttemptScreen} />
    <TestStack.Screen name="TestResults" component={TestResultsScreen} />
    <TestStack.Screen name="TestSolutions" component={TestSolutionsScreen} />
    <TestStack.Screen name="TestHistory" component={TestHistoryScreen} />
  </TestStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Tabs" component={ProfileScreen} />
    <ProfileStack.Screen name="Analytics" component={AnalyticsScreen} />
    <ProfileStack.Screen name="Downloads" component={DownloadsScreen} />
    <ProfileStack.Screen name="Bookmarks" component={BookmarksScreen} />
    <ProfileStack.Screen name="ProgressHistory" component={ProgressHistoryScreen} />
    <ProfileStack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
    <ProfileStack.Screen name="Receipt" component={ReceiptScreen} />
    <ProfileStack.Screen name="CouponsReferral" component={CouponsReferralScreen} />
    <ProfileStack.Screen name="HelpSupport" component={HelpSupportScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
  </ProfileStack.Navigator>
);

const BuyStackScreen = () => (
  <BuyStack.Navigator screenOptions={{ headerShown: false }}>
    <BuyStack.Screen name="ProductListing" component={ProductListingScreen} />
    <BuyStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <BuyStack.Screen name="Checkout" component={CheckoutScreen} />
    <BuyStack.Screen name="PurchaseSuccess" component={PurchaseSuccessScreen} />
  </BuyStack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
          <Text style={[styles.tabIconText, focused && styles.tabIconTextActive]}>
            {tabLabels[route.name] ?? "•"}
          </Text>
        </View>
      )
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Learn" component={LearnStackScreen} />
    <Tab.Screen name="Live" component={LiveStackScreen} />
    <Tab.Screen name="Test" component={TestStackScreen} />
    <Tab.Screen name="Buy" component={BuyStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />
  </Tab.Navigator>
);

const AuthFlow = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
    <AuthStack.Screen name="Otp" component={OtpScreen} options={{ title: "Verify OTP" }} />
    <AuthStack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ title: "Onboarding" }}
    />
  </AuthStack.Navigator>
);

export const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {token ? (
        <Tabs />
      ) : (
        <AuthFlow />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: lightTheme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: lightTheme.colors.border
  },
  tabIconActive: {
    backgroundColor: lightTheme.colors.primarySoft,
    borderColor: lightTheme.colors.primary
  },
  tabIconText: {
    fontSize: 12,
    fontWeight: "700",
    color: lightTheme.colors.textSecondary
  },
  tabIconTextActive: {
    color: lightTheme.colors.textPrimary
  }
});
