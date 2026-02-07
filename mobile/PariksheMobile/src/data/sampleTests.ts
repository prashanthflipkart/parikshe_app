export type SampleQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type SampleTest = {
  id: string;
  title: string;
  durationMinutes: number;
  questions: SampleQuestion[];
};

export const sampleTests: SampleTest[] = [
  {
    id: "sample-physics-1",
    title: "Light • Refraction • 10 Qs",
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        prompt: "Refraction is the bending of light when it passes from:",
        options: ["One medium to another", "Vacuum to vacuum", "Only air to air", "Only glass to glass"],
        correctIndex: 0
      },
      {
        id: "q2",
        prompt: "The unit of refractive index is:",
        options: ["m/s", "No unit", "m", "kg"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "Light travels fastest in:",
        options: ["Glass", "Water", "Vacuum", "Diamond"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "sample-math-1",
    title: "Algebra • Linear Equations • 8 Qs",
    durationMinutes: 12,
    questions: [
      {
        id: "q1",
        prompt: "Solve: 2x + 3 = 11",
        options: ["x = 4", "x = 5", "x = 6", "x = 7"],
        correctIndex: 0
      },
      {
        id: "q2",
        prompt: "If x - 5 = 9, then x =",
        options: ["4", "9", "14", "18"],
        correctIndex: 2
      }
    ]
  }
];
