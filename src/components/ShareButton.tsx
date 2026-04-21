import { Ionicons } from '@expo/vector-icons';
import { Alert, Share, TouchableOpacity } from 'react-native';
import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';
import { computeTotals } from '@/lib/totals';
import { formatNumber } from '@/lib/format';

type ShareButtonProps = {
  meals: Meal[];
};

export default function ShareButton({ meals }: ShareButtonProps) {
  const handleShare = async () => {
    const totals = computeTotals(meals);

    const message = [
      'MacroZone Summary',
      '',
      `Calories: ${formatNumber(totals.calories)}`,
      `Protein: ${formatNumber(totals.protein)}g`,
      `Carbs: ${formatNumber(totals.carbs)}g`,
      `Fat: ${formatNumber(totals.fat)}g`,
      '',
      `Meals logged: ${meals.length}`,
    ].join('\n');

    try {
      await Share.share({ message });
    } catch {
      Alert.alert('Error', 'Could not share summary.');
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
