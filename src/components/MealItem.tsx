import { View, Text, StyleSheet } from 'react-native';
import { formatNumber } from '@/lib/format';

type MealItemProps = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function MealItem({
  name,
  calories,
  protein,
  carbs,
  fat,
}: MealItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {formatNumber(calories)} cal • {formatNumber(protein)}g P •{' '}
        {formatNumber(carbs)}g C • {formatNumber(fat)}g F
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  macros: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
  },
});
