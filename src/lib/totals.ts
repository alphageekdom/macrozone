import { Meal } from '@/storage/meals';

export type MacroTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const computeTotals = (meals: Meal[]): MacroTotals =>
  meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
