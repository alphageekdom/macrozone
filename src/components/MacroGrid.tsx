import { View, StyleSheet } from 'react-native';
import MacroCard from './MacroCard';
import { Meal } from '@/storage/meals';

type MacroGridProps = {
  meals: Meal[];
};

const formatNumber = (n: number) => n.toLocaleString('en-US');

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <View style={styles.grid}>
      <MacroCard
        label="Calories"
        value={formatNumber(totals.calories)}
        goal="2,000"
        color="#ff9f43"
      />
      <MacroCard
        label="Protein"
        value={`${formatNumber(totals.protein)}g`}
        goal="150g"
        color="#ff6b6b"
      />
      <MacroCard
        label="Carbs"
        value={`${formatNumber(totals.carbs)}g`}
        goal="250g"
        color="#ffd93d"
      />
      <MacroCard
        label="Fat"
        value={`${formatNumber(totals.fat)}g`}
        goal="65g"
        color="#a78bfa"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
