import { View, StyleSheet } from 'react-native';
import MacroCard from './MacroCard';
import { Meal } from '@/storage/meals';
import { formatNumber } from '@/lib/format';
import { computeTotals } from '@/lib/totals';

type MacroGridProps = {
  meals: Meal[];
};

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = computeTotals(meals);

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
