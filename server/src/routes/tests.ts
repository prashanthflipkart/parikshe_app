import { Router } from "express";
import { db } from "../config/db";
import { requireAuth, AuthedRequest } from "../middleware/auth";

export const testsRouter = Router();

const sampleTest = {
  id: "test_1",
  title: "Light - Refraction",
  questionCount: 2,
  durationMinutes: 15,
  questions: [
    {
      id: "q1",
      prompt: "Refractive index is defined as?",
      options: ["sin i / sin r", "sin r / sin i", "i / r", "r / i"],
      correctIndex: 0,
      explanation: "Refractive index n = sin i / sin r."
    },
    {
      id: "q2",
      prompt: "The bending of light when it enters a new medium is called?",
      options: ["Reflection", "Refraction", "Dispersion", "Diffraction"],
      correctIndex: 1,
      explanation: "Refraction is bending of light across media."
    }
  ]
};

testsRouter.get("/", (_req, res) => {
  res.json({
    tests: [
      {
        id: sampleTest.id,
        title: sampleTest.title,
        questionCount: sampleTest.questionCount,
        durationMinutes: sampleTest.durationMinutes,
        isLocked: false
      }
    ]
  });
});

testsRouter.post("/:id/submit", requireAuth, async (req: AuthedRequest, res) => {
  const answers = Array.isArray(req.body?.answers) ? req.body.answers : [];
  const timeSpentSeconds = Number(req.body?.timeSpentSeconds ?? 0);
  const userId = req.user?.userId ?? null;

  const total = sampleTest.questions.length;
  let score = 0;
  sampleTest.questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      score += 1;
    }
  });
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const result = await db.query(
    `
      INSERT INTO attempts (id, user_id, test_id, score, accuracy, time_spent_seconds)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING id
    `,
    [userId, req.params.id, score, accuracy, timeSpentSeconds]
  );

  const attemptId = result.rows[0]?.id as string | undefined;
  if (attemptId) {
    const values = sampleTest.questions.map((q, idx) => {
      const selectedIndex = typeof answers[idx] === "number" ? answers[idx] : null;
      const isCorrect = selectedIndex === q.correctIndex;
      return [attemptId, q.id, selectedIndex, isCorrect];
    });

    for (const row of values) {
      await db.query(
        `
          INSERT INTO attempt_answers (id, attempt_id, question_id, selected_index, is_correct)
          VALUES (gen_random_uuid(), $1, $2, $3, $4)
        `,
        row
      );
    }
  }

  res.json({
    status: "ok",
    attemptId: attemptId ?? `attempt_${Date.now()}`,
    score,
    total,
    accuracy
  });
});

testsRouter.get("/attempts/me", requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.userId ?? null;
  const params: Array<string> = [];
  let query =
    'SELECT id, test_id as "testId", score, accuracy, created_at as "createdAt" FROM attempts';
  if (userId) {
    query += " WHERE user_id = $1";
    params.push(userId);
  }
  query += " ORDER BY created_at DESC LIMIT 20";

  const result = await db.query(query, params);
  const attempts = result.rows.map((row: any) => ({
    ...row,
    testTitle: sampleTest.title,
    total: sampleTest.questions.length
  }));
  res.json({ attempts });
});

testsRouter.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    title: sampleTest.title,
    questionCount: sampleTest.questionCount,
    durationMinutes: sampleTest.durationMinutes,
    questions: sampleTest.questions
  });
});
