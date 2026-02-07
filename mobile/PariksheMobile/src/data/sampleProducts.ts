export type SampleProduct = {
  id: string;
  title: string;
  price: number;
  type: "full" | "crash";
  durationMonths: number;
};

export const sampleProducts: SampleProduct[] = [
  {
    id: "sslc-crash-2025-26",
    title: "SSLC Crash Course (2025-26)",
    price: 999,
    type: "crash",
    durationMonths: 3
  },
  {
    id: "aarambha-2026-1st-puc",
    title: "Aarambha 2026 • 1st PUC",
    price: 0,
    type: "full",
    durationMonths: 12
  },
  {
    id: "vijetha-2026-2nd-puc",
    title: "Vijetha 2026 • 2nd PUC",
    price: 0,
    type: "full",
    durationMonths: 12
  },
  {
    id: "sankalpa-1st-puc",
    title: "Sankalpa • 1st PUC (Commerce)",
    price: 0,
    type: "full",
    durationMonths: 12
  },
  {
    id: "sadhaka-2nd-puc",
    title: "Sadhaka • 2nd PUC (Commerce)",
    price: 0,
    type: "full",
    durationMonths: 12
  }
];
