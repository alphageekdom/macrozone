import { Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { formatNumber } from '@/lib/format';
import { deleteMeal } from '@/storage/meals';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDeleted: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDeleted,
}: MealItemProps) {
  const handleLongPress = () => {
    Alert.alert('Delete Meal', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMeal(id);
            onDeleted();
          } catch {
            Alert.alert('Error', 'Could not delete meal.');
          }
        },
      },
    ]);
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {formatNumber(calories)} cal • {formatNumber(protein)}g P •{' '}
        {formatNumber(carbs)}g C • {formatNumber(fat)}g F
      </Text>
    </TouchableOpacity>
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
