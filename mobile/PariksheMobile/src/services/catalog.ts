import { API_BASE } from "./api";
import { sampleTests } from "../data/sampleTests";
import { sampleProducts } from "../data/sampleProducts";

export const getCategories = async () => {
  const response = await fetch(`${API_BASE}/catalog/categories`);
  return response.json();
};

export const getProducts = async (categoryId?: string) => {
  const url = categoryId
    ? `${API_BASE}/catalog/products?categoryId=${encodeURIComponent(categoryId)}`
    : `${API_BASE}/catalog/products`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.products?.length) {
      return data;
    }
  } catch {
    // fall back to sample products
  }
  return { products: sampleProducts };
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE}/catalog/products/${id}`);
    const data = await response.json();
    if (data?.product?.id || data?.id) {
      return data;
    }
  } catch {
    // fall back to sample product
  }
  const match = sampleProducts.find(product => product.id === id) ?? sampleProducts[0];
  return { product: match };
};

export const getLiveClasses = async () => {
  const response = await fetch(`${API_BASE}/live`);
  return response.json();
};

export const getDiscovery = async () => {
  const response = await fetch(`${API_BASE}/discovery`);
  return response.json();
};

export const getTests = async () => {
  try {
    const response = await fetch(`${API_BASE}/tests`);
    const data = await response.json();
    if (data?.tests?.length) {
      return data;
    }
  } catch {
    // fall back to sample tests
  }
  return {
    tests: sampleTests.map(test => ({
      id: test.id,
      title: test.title,
      questionCount: test.questions.length,
      durationMinutes: test.durationMinutes
    }))
  };
};

export const getTestById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE}/tests/${id}`);
    const data = await response.json();
    if (data?.id || data?.testId || data?.questions?.length) {
      return data;
    }
  } catch {
    // fall back to sample test
  }
  const match = sampleTests.find(test => test.id === id) ?? sampleTests[0];
  return {
    id: match.id,
    title: match.title,
    questionCount: match.questions.length,
    durationMinutes: match.durationMinutes,
    questions: match.questions.map(question => ({
      id: question.id,
      prompt: question.prompt,
      options: question.options
    }))
  };
};

export const submitTest = async (
  testId: string,
  answers: number[],
  timeSpentSeconds: number,
  token: string | null
) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${API_BASE}/tests/${testId}/submit`, {
      method: "POST",
      headers,
      body: JSON.stringify({ answers, timeSpentSeconds })
    });
    return response.json();
  } catch {
    const sample = sampleTests.find(test => test.id === testId);
    if (!sample) {
      return { attemptId: `local-${Date.now()}`, score: 0, total: answers.length, accuracy: 0 };
    }
    const score = sample.questions.reduce((sum, question, index) => {
      const choice = answers[index];
      return sum + (choice === question.correctIndex ? 1 : 0);
    }, 0);
    const total = sample.questions.length;
    const accuracy = total ? Math.round((score / total) * 100) : 0;
    return { attemptId: `local-${Date.now()}`, score, total, accuracy };
  }
};

export const getTestAttempts = async (token: string | null) => {
  const response = await fetch(`${API_BASE}/tests/attempts/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return response.json();
};

export const getSubjects = async (categoryId: string) => {
  const response = await fetch(
    `${API_BASE}/catalog/subjects?categoryId=${encodeURIComponent(categoryId)}`
  );
  return response.json();
};

export const getChapters = async (subjectId: string) => {
  const response = await fetch(
    `${API_BASE}/catalog/chapters?subjectId=${encodeURIComponent(subjectId)}`
  );
  return response.json();
};

export const getTopics = async (chapterId: string) => {
  const response = await fetch(
    `${API_BASE}/catalog/topics?chapterId=${encodeURIComponent(chapterId)}`
  );
  return response.json();
};

export const getLessons = async (topicId: string) => {
  const response = await fetch(
    `${API_BASE}/catalog/lessons?topicId=${encodeURIComponent(topicId)}`
  );
  return response.json();
};

export const getLessonById = async (id: string) => {
  const response = await fetch(`${API_BASE}/catalog/lessons/${id}`);
  return response.json();
};
