import AsyncStorage from "@react-native-async-storage/async-storage";

export type BookmarkItem = {
  lessonId: string;
  title: string;
};

export type DownloadItem = {
  lessonId: string;
  title: string;
  url: string;
  localPath: string;
  createdAt: string;
};

const BOOKMARKS_KEY = "parikshe.bookmarks";
const DOWNLOADS_KEY = "parikshe.downloads";
const CONTINUE_KEY = "parikshe.continue";
const PROGRESS_KEY = "parikshe.lessonProgress";
const TEST_ATTEMPTS_KEY = "parikshe.testAttempts";
const TODAY_PLAN_KEY = "parikshe.todayPlan";

export const getBookmarks = async () => {
  const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return raw ? (JSON.parse(raw) as BookmarkItem[]) : [];
};

export const toggleBookmark = async (item: BookmarkItem) => {
  const current = await getBookmarks();
  const exists = current.find(bookmark => bookmark.lessonId === item.lessonId);
  const next = exists
    ? current.filter(bookmark => bookmark.lessonId !== item.lessonId)
    : [...current, item];
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
  return !exists;
};

export const removeBookmark = async (lessonId: string) => {
  const current = await getBookmarks();
  const next = current.filter(item => item.lessonId !== lessonId);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
  return next;
};

export const getDownloads = async () => {
  const raw = await AsyncStorage.getItem(DOWNLOADS_KEY);
  return raw ? (JSON.parse(raw) as DownloadItem[]) : [];
};

export const addDownload = async (item: DownloadItem) => {
  const current = await getDownloads();
  const next = [item, ...current.filter(entry => entry.lessonId !== item.lessonId)];
  await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(next));
  return next;
};

export const removeDownload = async (lessonId: string) => {
  const current = await getDownloads();
  const next = current.filter(entry => entry.lessonId !== lessonId);
  await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(next));
  return next;
};

export type ContinueLearning = {
  lessonId: string;
  title: string;
  progressPercent: number;
  updatedAt: string;
};

export const getContinueLearning = async () => {
  const raw = await AsyncStorage.getItem(CONTINUE_KEY);
  return raw ? (JSON.parse(raw) as ContinueLearning) : null;
};

export const setContinueLearning = async (item: ContinueLearning) => {
  await AsyncStorage.setItem(CONTINUE_KEY, JSON.stringify(item));
  return item;
};

export type LessonProgress = {
  lessonId: string;
  title: string;
  progressPercent: number;
  updatedAt: string;
};

export const getLessonProgressMap = async () => {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, LessonProgress>) : {};
};

export const setLessonProgress = async (item: LessonProgress) => {
  const current = await getLessonProgressMap();
  const next = {
    ...current,
    [item.lessonId]: item
  };
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  return next;
};

export const getLessonProgressList = async () => {
  const map = await getLessonProgressMap();
  return Object.values(map).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

export type TestAttempt = {
  attemptId: string;
  testId: string;
  testTitle: string;
  score: number;
  total: number;
  accuracy: number;
  createdAt: string;
};

export const getLocalTestAttempts = async () => {
  const raw = await AsyncStorage.getItem(TEST_ATTEMPTS_KEY);
  return raw ? (JSON.parse(raw) as TestAttempt[]) : [];
};

export const addLocalTestAttempt = async (item: TestAttempt) => {
  const current = await getLocalTestAttempts();
  const next = [item, ...current];
  await AsyncStorage.setItem(TEST_ATTEMPTS_KEY, JSON.stringify(next));
  return next;
};

export type TodayPlanItem = {
  id: string;
  title: string;
  minutes: number;
  done: boolean;
};

export const getTodayPlan = async () => {
  const raw = await AsyncStorage.getItem(TODAY_PLAN_KEY);
  return raw ? (JSON.parse(raw) as TodayPlanItem[]) : [];
};

export const setTodayPlan = async (items: TodayPlanItem[]) => {
  await AsyncStorage.setItem(TODAY_PLAN_KEY, JSON.stringify(items));
  return items;
};
