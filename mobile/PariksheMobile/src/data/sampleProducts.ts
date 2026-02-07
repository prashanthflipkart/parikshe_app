export type SampleProduct = {
  id: string;
  title: string;
  price: number;
  type: "full" | "crash";
  durationMonths: number;
};

export const sampleProducts: SampleProduct[] = [
  {
    id: "batch-sslc-full",
    title: "SSLC Full-year Batch",
    price: 4999,
    type: "full",
    durationMonths: 12
  },
  {
    id: "batch-sslc-crash",
    title: "SSLC Crash Course",
    price: 1999,
    type: "crash",
    durationMonths: 3
  },
  {
    id: "batch-pu2-science",
    title: "PU2 Science Full-year",
    price: 5999,
    type: "full",
    durationMonths: 12
  }
];
