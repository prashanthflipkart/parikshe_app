export type CategoryId = "sslc" | "puc_science" | "puc_commerce";

export type ProductType = "full_year" | "crash" | "addon";

export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  title: string;
  type: ProductType;
  durationMonths?: number;
  price: number;
  isActive?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isFree: boolean;
}

export interface LiveClass {
  id: string;
  title: string;
  startsAt: string;
  teacherName: string;
  isLocked: boolean;
}

export interface TestMeta {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
  isLocked: boolean;
}
