import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';
import { buildSummaryText } from '@/lib/totals';

type CopyButtonProps = {
  meals: Meal[];
};

export default function CopyButton({ meals }: CopyButtonProps) {
  const handleCopy = async () => {
    const summary = buildSummaryText(meals);

    try {
      await Clipboard.setStringAsync(summary);
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Copied!', 'Macro summary copied to clipboard.');
    } catch {
      Alert.alert('Error', 'Could not copy summary.');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
