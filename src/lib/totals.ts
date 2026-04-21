import { Meal } from '@/storage/meals';
import { formatNumber } from './format';

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

export const buildSummaryText = (meals: Meal[]): string => {
  const totals = computeTotals(meals);
  return [
    'MacroZone Summary',
    '',
    `Calories: ${formatNumber(totals.calories)}`,
    `Protein: ${formatNumber(totals.protein)}g`,
    `Carbs: ${formatNumber(totals.carbs)}g`,
    `Fat: ${formatNumber(totals.fat)}g`,
    '',
    `Meals logged: ${meals.length}`,
  ].join('\n');
};
