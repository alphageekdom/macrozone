import { Ionicons } from '@expo/vector-icons';
import { Alert, Share, TouchableOpacity } from 'react-native';
import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';
import { buildSummaryText } from '@/lib/totals';

type ShareButtonProps = {
  meals: Meal[];
};

export default function ShareButton({ meals }: ShareButtonProps) {
  const handleShare = async () => {
    const message = buildSummaryText(meals);

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
