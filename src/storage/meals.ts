import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

const MEALS_KEY = 'meals';

export const getMeals = async (): Promise<Meal[]> => {
  try {
    const data = await AsyncStorage.getItem(MEALS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addMeal = async (
  meal: Omit<Meal, 'id' | 'createdAt'>
): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));

  console.log(newMeal);

  return newMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};
